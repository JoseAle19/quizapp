// Dependencias ecternas
import Modal from "react-modal";
import { useState } from "react";
import { CardQuestions } from "./CardQuestions";
import '../css/CardQuestionUpdate.css'
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

export const CardDataQuestions = ({ question }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#ee82ee";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {question.map((question, index) => {
        return (
          <div key={index} className="card_questionpage-card">
            <div className="card_questionpage_menutop">
              <div className="card_questionpage-menuleft">
                <img src="../../../public/icon-question.png" alt="" />
                <p>pregunta {index + 1}</p>
              </div>
              <div className="card_questionpage-menuright">
                <img
                className="card_questionpage-edit_img"
                  onClick={() => {
                    openModal();
                  }}
                  src="../../../public/edit.png"
                  alt=""
                />
                <Modal
                  isOpen={modalIsOpen}
                  onafterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={modalCustomStyles}
                  contentLabel="Modal ejemplo"
                >
                  <CardQuestions name={"pregunta"} placeholder={"Pregunta"} />
                </Modal>

                <img src="../../../public/delete.png" alt="" />
              </div>
            </div>
            <div className="card_questionpage-titleQ">
              <p>Pregunta: {question.question}</p>
            </div>

            <div className="card_questionpage-answers">
              <span>Respuestas</span>
              <hr />
              <div className="card_questionpage-gridanswers">
                {JSON.parse(question.answers).answers.map((answer, index) => {
                  return (
                    <p
                      className={
                        answer.correct ? "text-success" : "text-danger"
                      }
                      key={index}
                    >
                      {answer.answer}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="card_questionpage-options">
              <p>Tiempo: {question.timeQ}s</p>
              <p>Diciplina {question.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
