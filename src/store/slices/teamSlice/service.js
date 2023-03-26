import { quizApi } from "../../../Api/QuizApi";


// TODO: Falta hacer el servicio para el getTeamForAdviser no esta en el backend y ni terminado

export const getTeamForAdviser = async (data) => {
  try {
    const { data } = await quizApi.get(`team/getTeamForAdviser/${data}`);
    return data;
  } catch (error) {
    return {
      status: false,
      error: error.response.data.err?.errors || error.response.data,
    };
  }
}
