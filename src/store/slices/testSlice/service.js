import { quizApi } from "../../../Api/QuizApi";

export const servicePostTest = async (dataTest) => {
  try {
    // {{url}}/test/new-test/
    const { data } = await quizApi.post("test/new-test", dataTest);
    return data;
  } catch (error) {
    return {
      err: error.response.data.err?.errors || error.response.data,
    };
  }
};

export const serviceGetTest = async (studentYear) => {
  try {
    const { data } = await quizApi.get(`test/testForYear/${studentYear}`);
    return data;
  } catch (error) {
    return {
      err: error.response.data.err?.errors || error.response.data,
    };
  }
};

// Servicio para obtener las preguntas de un test
export const serviceGetQuestionByTest = async (idTest, userYear) => {
  try {
    const { data } = await quizApi.get(
      `test/questionsByTest/${idTest}/${userYear}`
    );
    return data;
  } catch (error) {
    return {
      err: error.response.data.err?.errors || error.response.data,
    };
  }
};

export const serviceGetTestActive = async (id) => {
  try {
    const { data } = await quizApi.get(`test/test-enable/${id}`);
    return data;
  } catch (error) {
    return error.response.data.err?.errors || error.response.data;
  }
};
