import { useEffect } from "react";
import {
  getQuestionByTest,
} from "../../../store/slices/testSlice/thunks";
import { CountdownTimer } from "../components/CounterTime";

import { hookDoingtest } from "../hooks/hookDoingtest";

export const DoingTest = () => {
  const {
    user,
    dispatch,
    tests,
    seconstOrMinutes,
    seconstOrMinutesByTest,
    duration,
    id,
    selectedAnswers,
    setSelectedAnswers,
    handleSelectAnswer,
    handleTimerEnd,
    confirmFinishTest 
  } = hookDoingtest();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    };
    window.addEventListener("popstate", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectedAnswers]);

  // Listener de recarga de pagina
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    };
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
    // dispatch(getTest(user.year));
    dispatch(getQuestionByTest(id, user.year));
  }, []);

  return (
    <div>
      <div>
        <span>conectado</span>
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
        onClick={() => confirmFinishTest()}
      >
        Terminar
      </button>
    </div>
  );
};
