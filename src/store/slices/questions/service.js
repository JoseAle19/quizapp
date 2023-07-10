import { quizApi } from "../../../Api/QuizApi";

export const servicesQuestions = async (dataQuestions) => {
  try {
    const { data } = await quizApi.post("questions/newQuestion", {
      ...dataQuestions,
    });
    return data;
  } catch (error) {
    console.log(error.response.data);
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

export const servicesUpdateQuestion = async (dataQuestions, questionId) => {
  const { answers, question, timeQ } = dataQuestions;

  try {
    const { data } = await quizApi.put("questions/updateQuestion", {
      question,
      timeQ,
      answers,
      questionId,
    });
    return data;
  } catch (error) {
    return {
      status: false,
      error: error.response.data.err?.errors || error.response.data,
    };
  }
};

export const servicesDeleteQuestion = async (questionId) => {
  try {
    const { data } = await quizApi.delete(
      `questions/deleteQuestion/${questionId}`
    );
    return data;
  } catch (error) {
    return {
      status: false,
      error: error.response.data.err?.errors || error.response.data,
    };
  }
};
