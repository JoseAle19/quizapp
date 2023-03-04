import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categoriesQuiz",
  initialState: {
    categories: [],
    isLoading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    setCategories: (state, { payload }) => {
      (state.isLoading = false), (state.categories = payload.result);
    },
  },
});
export const { startLoading, setCategories } = categoriesSlice.actions;
