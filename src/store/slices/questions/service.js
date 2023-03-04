import { quizApi } from "../../../Api/QuizApi";

export const servicesQuestions = async (dataQuestions) => {
  try {
    const { data } = await quizApi.post("questions/newQuestion", {
      ...dataQuestions,
    });
    return data;
  } catch (error) {
    return {
      status: false,
      error: error.response.data.err?.errors || error.response.data,
    };
  }
};

export const servicesGetQuestions = async () => {
  try {
    const { data } = await quizApi.get("questions/getAllQuestion");
    return data;
  } catch (error) {
    return {
      status: false,
      error: error.response.data.err?.errors || error.response.data,
    };
  }
};
