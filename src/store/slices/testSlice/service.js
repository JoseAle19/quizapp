import { quizApi } from "../../../Api/QuizApi";

export const servicePostTest = async (dataTest) => {
  try {
    // {{url}}/test/new-test/
    const {data} = await quizApi.post("test/new-test", dataTest);
    return data;
  } catch (error) {
    return {
      err: error.response.data.err?.errors || error.response.data,
    };
  }
};

export const serviceGetTest =async (studentYear) =>{
try {
  const { data } = await quizApi.get(`test/testForYear/${studentYear}`)
  return data
} catch (error) {
  return{
    err: error.response.data.err?.errors || error.response.data,
  }
}  
}