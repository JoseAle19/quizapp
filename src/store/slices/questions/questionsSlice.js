import { createSlice } from '@reduxjs/toolkit';

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: [], 
    },
    reducers: {
        SetQuestions: (state, {payload}  ) => {
            state.questions = payload;
        },
    }
});
export const { SetQuestions} = questionsSlice.actions;