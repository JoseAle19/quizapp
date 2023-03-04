import { quizApi } from "../../../Api/QuizApi";
import { setCategories, startLoading } from "./categoriesSlice";

export const getCategories = () => {
    return async (dispatch) => {
        dispatch(startLoading())
        
        //Peticion al api hacia  el endpoint de categorias
        // endPoint de llas categorias http://localhost:4000/categories/getAllCategories
        const  {data} = await quizApi.get('categories/getAllCategories')
        dispatch(setCategories(data))
  };
};
