// TODO : Falta el endpoint de la API
import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    isLoading: false,
    tests: [],
    questionsByTest: [],
  },
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setTest: (state, { payload }) => {
      state.tests = payload;
    },
    setQuestionsByTest: (state, { payload }) => {
      state.questionsByTest = payload;
    },
  },
});
export const { setIsLoading, setTest, setQuestionsByTest } = testSlice.actions;
