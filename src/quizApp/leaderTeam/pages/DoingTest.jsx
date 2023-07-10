import { useEffect } from "react";
import { getQuestionByTest } from "../../../store/slices/testSlice/thunks";
import { CountdownTimer } from "../components/CounterTime";
import "../css/DoingTest.css";
import { hookDoingtest } from "../hooks/hookDoingtest";
import { urlProduccionApi } from "../../../Api/QuizApi";
import { socket } from "../../../socket";

export const DoingTest = () => {
  // Metodo para verificiar si estas en produccion o local
  const isProductionOrLocal = (question) => {
    urlProduccionApi === "https://apiquizapp-production.up.railway.app/";

    if (urlProduccionApi === "https://apiquizapp-production.up.railway.app/") {
      return question.answers.answers;
    } else {
      return JSON.parse(question.answers).answers;
    }
  };

  const {
    user,
    dispatch,
    tests,
    seconstOrMinutesByTest,
    duration,
    id,
    selectedAnswers,
    setSelectedAnswers,
    handleTimerEnd,
    confirmFinishTest,
    responsesPerUsers,
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
    dispatch(getQuestionByTest(id, user.year));
  }, []);

  return (
    <main className="DoingTest-container">
      <div className="DoingTest-timeAndTile">
        <h1 className="DoingTest-title">Examen en curso</h1>
        <CountdownTimer
          minutes={seconstOrMinutesByTest(duration).minutes}
          seconds={seconstOrMinutesByTest(duration).seconds}
          onTimerEnd={handleTimerEnd}
        />
      </div>
      <div className="DoingTest-listQuestions">
        {tests.questions &&
          tests.questions.map((dataQuestion, questionIndex) => (
            <div key={questionIndex}>
              <p className="DoingTest-desQuestion">{dataQuestion.question}</p>
              {/* Respuestas de cada pregunta */}
              {isProductionOrLocal(dataQuestion).map((answer, index) => (
                <div key={index}>
                  <input
                    className="DoingTest-checkbox"
                    type="radio"
                    name={dataQuestion.question}
                    value={answer.answer}
                    onChange={() => responsesPerUsers(questionIndex, answer)}
                  />
                  <label className="DoingTest-desRespuesta">
                    {answer.answer}
                  </label>
                </div>
              ))}
              <hr />
            </div>
          ))}
      </div>
      <button
        className="DoingTest-buttonFinish"
        onClick={() => confirmFinishTest()}
      >
        Terminar
      </button>
    </main>
  );
};
