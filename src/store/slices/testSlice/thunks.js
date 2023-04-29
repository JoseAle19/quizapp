import { serviceGetQuestionByTest, serviceGetTest, servicePostTest } from "./service";
import { setIsLoading, setQuestionsByTest, setTest } from "./testSlice";



export const addTest = (dataTest) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    const data = await servicePostTest(dataTest);
    dispatch(setIsLoading(false));
    return  data
  };
}

export const getTest = (studentYear) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    const data = await serviceGetTest(studentYear);
    dispatch(setTest(data));
    dispatch(setIsLoading(false));
  };
}

export const removeStateTets = () => {
  return async (dispatch) => {
    dispatch(setTest([]));
  };
}


// Obtener las preguntas de un test
export const getQuestionByTest = (id, user) => {
    return  async (dispatch) => {
      dispatch(setIsLoading(true));
      const data = await serviceGetQuestionByTest(id, user);
      dispatch(setQuestionsByTest(data));
      dispatch(setIsLoading(false));
    }
}