import { quizApi } from "../../../Api/QuizApi";

export const getCategoriesService = async () => {
  try {
    const { data } = await quizApi.get("categories/getAllCategories");
    return data;
  } catch (error) {
    return error.response.data

  }
};
