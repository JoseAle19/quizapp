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
import { useState } from "react";
export const CreateTest = () => {
  const { isLoading } = useSelector((state) => state.test);
  const [titleTest, setTitleTest] = useState("Examen 2023");
  const [isEdit, setIsEdit] = useState(false);
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
          <div className="CreateTest_labelQuestions">
            <label>Numero de preguntas</label>
            <input
              className="CreateTest_numberQ"
              type="number"
              placeholder="Numero de preguntas"
              min={1}
              value={numberQ}
              onChange={handleCahngeNumberQ}
            />
          </div>

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
        <div>
          {/* div de editar */}
          <div className="d-flex align-items-center justify-content-center ">
            {isEdit ? (
              <div className="col-2">
                <input
                  className="form-control m-2"
                  type="text"
                  placeholder="Nombre del examen"
                  onChange={(e) => {
                    setTitleTest(e.target.value);
                  }}
                />
              </div>
            ) : (
              <div className="d-flex flex-row align-items-center justify-content-center">
                <p className="fs-3 text">{`Titulo de examen:`}</p>
                <p className=" mx-2  fs-3 text animate__animated  animate__lightSpeedInRight">
                  {titleTest}
                </p>
              </div>
            )}
            <svg
              onClick={() => {
                setIsEdit(!isEdit);
              }}
              height={30}
              width={30}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
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
          <button
            disabled={
              questionsAle.length === 0
                ? true
                : false || isLoading
                ? true
                : false
            }
            className={
              questionsAle.length === 0 || isLoading
                ? "CreateTest_noCreate"
                : "CreateTest_create"
            }
            onClick={(e) => {
              e.preventDefault();

              postTest({ name: titleTest, questions: questionsAle });
            }}
          >
            Crear examen
          </button>
        </div>{" "}
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
