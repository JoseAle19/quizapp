import React from "react";

export const DataTest = ({
  questionsAle,
  deleteQuestion,
  timeTest,
}) => {
  return (
    <div  >

      <div>
        {questionsAle.length === 0 ? (
          <p className="" >Ni una pregunta agregada</p>
        ) : (
          questionsAle.map((question, index) => {
            timeTest += question.timeQ;
            return (
              <div
                className="animate__animated animate__fadeInLeft"
                key={index}
              >
                <h6> ¿{question.question}?</h6>
                <button  
                className="btn btn-danger"
                onClick={() => deleteQuestion(question.id_Q)}>
                  eliminar
                </button>
              </div>
            );
          })
        )}
{questionsAle.length !== null &&<span>{`Tiempoo del examen ${Math.floor(timeTest /60) } minutos`}</span>}
      </div>          

    </div>
  );
};
