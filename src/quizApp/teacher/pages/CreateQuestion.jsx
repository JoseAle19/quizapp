import { useDispatch, useSelector } from "react-redux";
import { useForms } from "../hooks/useForms";
import { CardQuestions } from "../components/CardQuestions";
import { getCategories } from "../../../store/slices/categoriesQuiz/thunks";
import { useEffect } from "react";
import { DropDownButton } from "../components/DropDownButton";

export const CreateQuestion = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const { categories } = useSelector((state) => state.categories);
  //custom hook general ( quizappv2/src/quizApp/hooks)
  const { changeInputs, formState, saveQuestion } = useForms({
    idTeacher: user.id,
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
  });

  const { question, r1, r2, r3, r4, s1, s2, s3, s4, timeQ } = formState;

  return (
    <>
      <div>
        <h1 className="bg-success p-2 text-light m-auto text-center">
          Agregar preguntas
        </h1>
      <div>
      <DropDownButton changeInputs={changeInputs} categories={categories} label={categories.length <1 ? `No hay categorias` : `Seleciona una categoria`}/>

      </div>
        <form className="m-2 ">
          <div className="d-flex m-2">
            <input
              name="question"
              onChange={changeInputs}
              value={question}
              className="form-control border border-primary border-2 border-top-0 border-end-0 border-start-0 "
              type="text"
              placeholder="Pregunta"
            />
            <input
              name="timeQ"
              min={1}
              max={60}
              onChange={changeInputs}
              value={timeQ}
              placeholder="Tiempo en segundos"
              type="number"
              className="form-control ms-5"
            />
          </div>
          <div className="row">
            <div className="col">
              <CardQuestions
                name={"r1"}
                changeInputs={changeInputs}
                value={r1}
                placeholder={"Respuesta 1"}
                valueCheck={s1}
                valueCheckName="s1"
              />
              <CardQuestions
                name={"r2"}
                changeInputs={changeInputs}
                value={r2}
                placeholder={"Respuesta 2"}
                valueCheck={s2}
                valueCheckName="s2"
              />
              <button
                onClick={saveQuestion}
                type="submit"
                className="btn btn-primary p-2 m-2"
              >
                Crear pregnuta
              </button>
            </div>
            <div className="col">
              <CardQuestions
                name={"r3"}
                changeInputs={changeInputs}
                value={r3}
                placeholder={"Respuesta 3"}
                valueCheck={s3}
                valueCheckName="s3"
              />
              <CardQuestions
                name={"r4"}
                changeInputs={changeInputs}
                value={r4}
                placeholder={"Respuesta 4"}
                valueCheck={s4}
                valueCheckName="s4"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
