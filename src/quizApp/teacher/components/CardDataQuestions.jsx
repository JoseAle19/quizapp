// Dependencias externas
import Modal from "react-modal";
import { useState } from "react";
import "../css/CardQuestionUpdate.css";
import { CardQuestions } from "./CardQuestions";
import { useForms } from "../hooks/useForms";
import { urlProduccionApi } from "../../../Api/QuizApi";

const modalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const initialState = {
  idCategory: 0,
  question: "",
  timeQ: "",
  r1: "",
  r2: "",
  r3: "",
  r4: "",
  s1: false,
  s2: false,
  s3: false,
  s4: false,
};

export const CardDataQuestions = ({ question, stateQuestion }) => {
  // Estás en producción
  const isProductionOrLocal = (question) => {
    urlProduccionApi === "https://apiquizapp-production.up.railway.app/";

    if (urlProduccionApi === "https://apiquizapp-production.up.railway.app/") {
      // console.log("estás en producción");
      return question.answers.answers;
    } else {
      // console.log("estás en local");
      return JSON.parse(question.answers).answers;
    }
  };

  const [questionIndex, setQuestionIndex] = useState();

  const {
    changeInputs,
    formState,
    updateQuestion,
    closeModal,
    openModal,
    afterOpenModal,
    modalIsOpen,
    isEmpyUpdateAnswer, // Corregido: isEmpyUpateAnswer -> isEmpyUpdateAnswer
    modalInfo,
    addValueModal,
    deleteQuestion,
  } = useForms(initialState);
  const { question: q, r1, r2, r3, r4, s1, s2, s3, s4, timeQ } = formState;

  const answers = {
    answers: [
      {
        answer: r1.length <= 0 ? isEmpyUpdateAnswer(0) : r1, // Corregido: isEmpyUpateAnswer -> isEmpyUpdateAnswer
        correct: s1,
      },
      {
        answer: r2.length <= 0 ? isEmpyUpdateAnswer(1) : r2, // Corregido: isEmpyUpateAnswer -> isEmpyUpdateAnswer
        correct: s2,
      },
      {
        answer: r3.length <= 0 ? isEmpyUpdateAnswer(2) : r3, // Corregido: isEmpyUpateAnswer -> isEmpyUpdateAnswer
        correct: s3,
      },
      {
        answer: r4.length <= 0 ? isEmpyUpdateAnswer(3) : r4, // Corregido: isEmpyUpateAnswer -> isEmpyUpdateAnswer
        correct: s4,
      },
    ],
  };

  return (
    <>
      {question.map((question, index) => {
        return (
          <div key={index} className="card_questionpage-card">
            <div className="card_questionpage_menutop">
              <div className="card_questionpage-menuleft">
                <img src="../../../public/icon-question.png" alt="question-icon" />
                <p className="text-white">pregunta {index + 1}</p>
              </div>
              <div className="card_questionpage-menuright">
                <img
                  className="card_questionpage-edit_img"
                  onClick={() => {
                    addValueModal(stateQuestion[index]);
                    setQuestionIndex(index);
                    openModal();
                  }}
                  src="../../../edit.png"
                  alt="edit"
                />
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal} // Corregido: onafterOpen -> onAfterOpen
                  onRequestClose={closeModal}
                  style={modalCustomStyles}
                >
                  <div>
                    {/* Datos del input */}
                    <div className="d-flex m-2">
                      <input
                        name="question"
                        onChange={changeInputs}
                        value={q}
                        className="form-control border border-primary border-2 border-top-0 border-end-0 border-start-0"
                        type="text"
                        placeholder={modalInfo.question}
                      />
                      <input
                        name="timeQ"
                        min={1}
                        max={60}
                        onChange={changeInputs}
                        value={timeQ}
                        placeholder={modalInfo.timeQ}
                        type="number"
                        className="form-control ms-5"
                      />
                    </div>
                    {/* Termina los datos del input */}

                    {/* Datos del modal */}
                    <CardQuestions
                      name={"r1"}
                      changeInputs={changeInputs}
                      value={r1}
                      placeholder={
                        modalInfo.answers &&
                        JSON.parse(modalInfo.answers).answers[0].answer
                      }
                      valueCheck={s1}
                      valueCheckName="s1"
                    />

                    <CardQuestions
                      name={"r2"}
                      changeInputs={changeInputs}
                      value={r2}
                      placeholder={
                        modalInfo.answers &&
                        JSON.parse(modalInfo.answers).answers[1].answer
                      }
                      valueCheck={s2}
                      valueCheckName="s2"
                    />
                    <CardQuestions
                      name={"r3"}
                      changeInputs={changeInputs}
                      value={r3}
                      placeholder={
                        modalInfo.answers &&
                        JSON.parse(modalInfo.answers).answers[2].answer
                      }
                      valueCheck={s3}
                      valueCheckName="s3"
                    />
                    <CardQuestions
                      name={"r4"}
                      changeInputs={changeInputs}
                      value={r4}
                      placeholder={
                        modalInfo.answers &&
                        JSON.parse(modalInfo.answers).answers[3].answer
                      }
                      valueCheck={s4}
                      valueCheckName="s4"
                    />
                    {/* Termina los datos del modal */}
                    <button
                      className="btn btn-primary mt-3 mb-3 w-100"
                      onClick={() => {
                        const answersIndex = JSON.stringify(answers);
                        const descriptionQuestion =
                          formState.question.length > 0
                            ? formState.question
                            : modalInfo.question;
                        const timeQuestion =
                          formState.timeQ.length > 0
                            ? parseInt(formState.timeQ)
                            : modalInfo.timeQ;

                        updateQuestion(
                          [s1, s2, s3, s4],
                          questionIndex, //index de la pregunta
                          modalInfo.id_Q, //id de la pregunta, id del index
                          descriptionQuestion, //descripcion de la pregunta
                          answersIndex, //respuestas de la pregunta en formato string
                          timeQuestion //tiempo de la pregunta
                        );
                      }}
                    >
                      Guardar
                    </button>
                  </div>
                </Modal>

                <img
                  src="../../../delete.png"
                  alt="delete"
                  onClick={() => {
                    deleteQuestion(question.id_Q, question.question, index);
                  }}
                />
              </div>
            </div>
            <div className="card_questionpage-titleQ">
              <p>Pregunta: {question?.question}</p>
            </div>

            <div className="card_questionpage-answers">
              <span>Respuestas</span>
              <hr />
              <div className="card_questionpage-gridanswers">
                {isProductionOrLocal(question).map((answer, index) => {
                  return (
                    <p
                      key={index}
                      className={
                        answer.correct ? "text-success" : "text-danger"
                      }
                    >
                      {answer.answer}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="card_questionpage-options">
              <p>Tiempo: {question.timeQ}s</p>
              <p>Disciplina: {question.description}</p> {/* Corregido: Disiplina -> Disciplina */}
            </div>
          </div>
        );
      })}
    </>
  );
};
