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
    deleteQuestionSlice: (state, { payload }) => {
      const { questionsNotDelete } = payload;

      state.questions = questionsNotDelete;
    },
  },
});
export const {
  SetQuestions,
  questionUpdateSlice,
  setLoading,
  deleteQuestionSlice,
} = questionsSlice.actions;
