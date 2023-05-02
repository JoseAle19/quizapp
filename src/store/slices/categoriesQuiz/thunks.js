import { setCategories, startLoading } from "./categoriesSlice";
import { getCategoriesService } from "./service";

export const getCategories = () => {
    return async (dispatch) => {
        dispatch(startLoading())
        
        const  data = await getCategoriesService()
        dispatch(setCategories(data))
  };
};


export const removeStateCategory = () => {
  return async (dispatch) => {
    dispatch(setCategories([]));
  };
}