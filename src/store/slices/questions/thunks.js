import { SetQuestions } from "./questionsSlice";
import { servicesGetQuestions, servicesQuestions } from "./service";



// Inserta una pregunta en la base de datos
export const addQuestion = (dataQuestions) => {
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