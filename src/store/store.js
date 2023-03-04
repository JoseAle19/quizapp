import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authQuiz/AuthSlice";
import { categoriesSlice } from "./slices/categoriesQuiz/categoriesSlice";
import { questionsSlice } from "./slices/questions/questionsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        categories: categoriesSlice.reducer,
        questions: questionsSlice.reducer,
    },
});
