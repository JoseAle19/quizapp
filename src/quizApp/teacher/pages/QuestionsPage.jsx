import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../../store/slices/questions/thunks";
import "../css/ListCardQuestion.css";
import { DropDownButton } from "../components/DropDownButton";
import { getCategories } from "../../../store/slices/categoriesQuiz/thunks";
import { useForms } from "../hooks/useForms";
import { CardDataQuestions } from "../components/CardDataQuestions";
export const QuestionsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getQuestions());
  }, []);
  const { questions } = useSelector((state) => state.questions);

  const { categories } = useSelector((state) => state.categories);
  const { formState, changeInputs } = useForms({
    idCategory: 0,
  });
  const { idCategory } = formState;

return (
    <>
      <div className="card_questionpage-contendor">
        <div className="card_questionpage-filt_title justify-content-around ">
          <DropDownButton
            changeInputs={changeInputs}
            categories={categories}
            label={"Todas las preguntas"}
          />
          <h1 >Todas las preguntas</h1>
        </div>
        {questions !== undefined? (
          <CardDataQuestions
          stateQuestion={questions}
            question={idCategory === 0 ? questions : questions.filter(
              (question) => question.id_category == idCategory
            )}
          />
        ) : (
          <h1>No hay preguntas</h1>
        )}
      </div>
    </>
  );
};
