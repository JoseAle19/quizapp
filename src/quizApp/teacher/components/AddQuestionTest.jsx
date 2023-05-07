import React from "react";
import "../css/CreateTest.css";
import "animate.css";
export const AddQuestionTest = ({ questions, add, exist }) => {
  return (
    <div className="CreateTest_manual animate__animated animate__fadeInLeft">
      {questions.map((question) => {
        return (
          <div className="CreateTest_manual_textButton" key={question.id_Q}>
            <span> {question.question}</span>
            <button
              disabled={exist(question.id_Q) ? true : false}
              onClick={() => {
                add(question);
              }}
            >
              Agregar
            </button>
          </div>
        );
      })}
    </div>
  );
};
