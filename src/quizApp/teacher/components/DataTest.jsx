import React from "react";
import { hookCreateTest } from "../hooks/hookCreateTest";

export const DataTest = ({
  questionsAle,
  postTest,
  deleteQuestion,
  seconstOrMinutes,
  timeTest,
  isLoading
}) => {
  return (
    <div>
      <h5>Nombre del examen</h5>

      <div>
        {questionsAle.length === 0 ? (
          <p>Ni una pregunta agregada</p>
        ) : (
          questionsAle.map((question, index) => {
            timeTest += question.timeQ;
            return (
              <div
                className="animate__animated animate__fadeInLeft"
                key={index}
              >
                <h6> ¿{question.question}?</h6>
                <button onClick={() => deleteQuestion(question.id_Q)}>
                  eliminar
                </button>
              </div>
            );
          })
        )}
        <span>{seconstOrMinutes(timeTest)}</span>
      </div>

      <button
        disabled={
          questionsAle.length === 0 ? true : false || isLoading ? true : false
        }
        className={
          questionsAle.length === 0 || isLoading
            ? "CreateTest_noCreate"
            : "CreateTest_create"
        }
        onClick={(e) => {
          e.preventDefault();

          postTest({ name: "5to concuurso", questions: questionsAle });
        }}
      >
        Crear examen
      </button>
    </div>
  );
};
