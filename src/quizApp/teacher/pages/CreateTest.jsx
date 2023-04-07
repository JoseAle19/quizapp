import React, { useEffect } from "react";
import { getQuestions } from "../../../store/slices/questions/thunks";
import "../css/CreateTest.css";
import { AddQuestionTest } from "../components/AddQuestionTest";

// Imporatacion de animaciones
import "animate.css";
import { hookCreateTest } from "../hooks/hookCreateTest";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../../ui/components/Loading";
import { DataTest } from "../components/DataTest";
export const CreateTest = () => {
  const { isLoading } = useSelector((state) => state.test);

  const {
    existQuestion,
    isAleatorio,
    isManual,
    numberQ,
    questionsAle,
    addManueal,
    handleChangeManual,
    questions,
    handleChangeAleatorio,
    handleCahngeNumberQ,
    postTest,
    deleteQuestion,
    seconstOrMinutes,
  } = hookCreateTest();

  let timeTest = 0;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  const handleScroll = () => {
    if (isLoading) {
      return (document.body.style.overflow = "hidden");
    }
    document.body.style.overflow = "auto";
    return "CreateTest_contenedor";
  };
  return (
    <div className={handleScroll()}>
 
      <h1 className="CreateTest_title">Crear nuevo examen</h1>

      <div className="CreateTest_conf_test">
        <div className="CreateTest_config">
          <input
            className="CreateTest_numberQ"
            type="number"
            placeholder="Numero de preguntas"
            min={1}
            value={numberQ}
            onChange={handleCahngeNumberQ}
          />

          <p>
            Agregar preguntas manualmente
            <input
              value={isManual}
              onChange={(e) => handleChangeManual(e)}
              className="CreateTest_checkbox"
              type="checkbox"
              disabled={isAleatorio ? true : false}
            />
          </p>
          <p>
            Agregar preguntas aleatorio
            <input
              className="CreateTest_checkbox"
              type="checkbox"
              value={isAleatorio}
              disabled={numberQ < 1 ? true : false || isManual ? true : false}
              onClick={(e) => {
                handleChangeAleatorio(e);
              }}
            />
          </p>
        </div>
        {/* Para agregar preguntas al examen  */}
        {isManual && (
          <AddQuestionTest
            add={addManueal}
            questions={questions}
            exist={existQuestion}
          />
        )}

        <div className="CreateTest_stateTets">
          <DataTest
            questionsAle={questionsAle}
            postTest={postTest}
            deleteQuestion={deleteQuestion}
            seconstOrMinutes={seconstOrMinutes}
            timeTest={timeTest}
            isLoading={isLoading}
          />
        </div>
        {isLoading && (
        <div className="CreateTest_positioned">
          {" "}
          <Loading />{" "}
        </div>
      )}
      </div>
    </div>
  );
};
