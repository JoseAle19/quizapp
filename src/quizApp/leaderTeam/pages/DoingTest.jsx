import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getQuestionByTest,
  getTest,
} from "../../../store/slices/testSlice/thunks";
import { hookCreateTest } from "../../teacher/hooks/hookCreateTest";
import { CountdownTimer } from "../components/CounterTime";

export const DoingTest = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { id, duration } = useParams();
  const user = useSelector((state) => state.auth.user);
  const tests = useSelector((state) => state.test.questionsByTest);
  const { seconstOrMinutes, seconstOrMinutesByTest } = hookCreateTest();

  const dispatch = useDispatch();
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      console.log("regreso");
      event.returnValue = "";
      localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    };
    window.addEventListener("popstate", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectedAnswers]);


  const handleSelectAnswer = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex,
    });
  };
  // Listener de recarga de pagina
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      console.log("unload");
      event.returnValue = "";
      localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectedAnswers]);

  useEffect(() => {
    localStorage.setItem(
      "Idtest",
      JSON.stringify({ status: "pending", id: id })
    );
    setSelectedAnswers(JSON.parse(localStorage.getItem("selectedAnswers")));
    dispatch(getTest(user.year));
    dispatch(getQuestionByTest(id, user.year));
  }, []);

  // Limitar datos de examen
  const handleFinishTest = () => {
    localStorage.removeItem("Idtest");
    localStorage.removeItem("selectedAnswers");
    setSelectedAnswers({});
  };
  // contador de tiempo
  const handleTimerEnd = () => {
    alert("¡Se acabó el tiempo!");
  };
  return (
    <div>
      <div>
        <h1>Examen en curso</h1>
        <h2>{seconstOrMinutes(duration)}</h2>
        <CountdownTimer
          minutes={seconstOrMinutesByTest(duration).minutes}
          seconds={seconstOrMinutesByTest(duration).seconds}
          onTimerEnd={handleTimerEnd}
        />
      </div>
      <div>
        {tests.questions &&
          tests.questions.map((dataQuestion, questionIndex) => (
            <div key={questionIndex}>
              <p>{dataQuestion.question}</p>
              {/* Respuestas de cada pregunta */}
              {JSON.parse(dataQuestion.answers).answers.map((answer, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name={dataQuestion.question}
                    value={answer.answer}
                    disabled={
                      selectedAnswers &&
                      selectedAnswers.hasOwnProperty(questionIndex)
                    }
                    onChange={(e) =>
                      handleSelectAnswer(questionIndex, answer, e)
                    }
                  />
                  <label>{answer.answer}</label>
                </div>
              ))}
              <hr />
            </div>
          ))}
      </div>
      <button
        // TODO: Falta estas funcionalidades
        onClick={() => handleFinishTest()}
      >
        Terminar
      </button>
    </div>
  );
};
