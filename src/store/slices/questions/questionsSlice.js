import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    loading: false,
    questions: [],
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    SetQuestions: (state, { payload }) => {
      state.questions = payload;
    },
    questionUpdateSlice: (state, { payload }) => {
      const { index, questionUpdate } = payload;
      state.questions[index] = questionUpdate;
    },
  },
});
export const { SetQuestions, questionUpdateSlice, setLoading } = questionsSlice.actions;
