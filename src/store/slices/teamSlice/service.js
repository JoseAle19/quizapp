import { quizApi } from "../../../Api/QuizApi";

export const getTeamForAdviser = async (id) => {
  try {
    const data = await quizApi.get(`adviser-team/getTeamById/${id}`);
    
    return data;
  } catch (error) {
    return {
      status: false,
      error: error.response.data.err?.errors || error.response.data,
    };
  }
};
