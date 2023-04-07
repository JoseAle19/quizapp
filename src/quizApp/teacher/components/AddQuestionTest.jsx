import React from "react";
import "../css/CreateTest.css";
import 'animate.css';
export const AddQuestionTest = ({ questions, add, exist}) => {
  return (
    <div className="CreateTest_manual animate__animated animate__fadeInLeft">
      {questions.map((question) => {
        return <div key={question.id_Q}>{question.question}
        <button 
        disabled={exist(question.id_Q)? true : false}
        onClick={() => {
          add(question)
        }}>Agregar</button>
        </div>;
      })}
    </div>
  );
};
