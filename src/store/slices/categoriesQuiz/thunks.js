import { setCategories, startLoading } from "./categoriesSlice";
import { getCategoriesService } from "./service";

export const getCategories = () => {
    return async (dispatch) => {
        dispatch(startLoading())
        
        //Peticion al api hacia  el endpoint de categorias
        // endPoint de llas categorias http://localhost:4000/categories/getAllCategories
        const  data = await getCategoriesService()
        dispatch(setCategories(data))
  };
};


export const removeStateCategory = () => {
  return async (dispatch) => {
    dispatch(setCategories([]));
  };
}