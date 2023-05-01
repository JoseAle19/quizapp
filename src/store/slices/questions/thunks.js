import { SetQuestions, setLoading } from "./questionsSlice";
import { servicesGetQuestions, servicesQuestions, servicesUpdateQuestion } from "./service";



// Inserta una pregunta en la base de datosl
export const addQuestion = (dataQuestions) => {
  console.log(dataQuestions);
  return async (dispatch) => {
    const data = await servicesQuestions(dataQuestions);
  };
};



// Obtiene todas las preguntas de la servicio 
export const getQuestions = () => {
  return async (dispatch) => {
    const {data} = await servicesGetQuestions();
    dispatch(SetQuestions(data))
  }

}


// Actualizar una pregunta en la base de datos
export const updateQuestionThunk = (dataQuestions, id) => {
  console.log(dataQuestions, id);
  return async (dispatch) => {
    dispatch(setLoading(true));
    const data = await servicesUpdateQuestion(dataQuestions, id);
    dispatch(setLoading(false));
    console.log(data);
  };
}
