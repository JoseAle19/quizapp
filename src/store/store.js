import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authQuiz/AuthSlice";
import { categoriesSlice } from "./slices/categoriesQuiz/categoriesSlice";
import { questionsSlice } from "./slices/questions/questionsSlice";
import { teamSlice } from "./slices/teamSlice/teamSlice";
import { testSlice } from "./slices/testSlice/testSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        categories: categoriesSlice.reducer,
        questions: questionsSlice.reducer,
        team: teamSlice.reducer,
        test: testSlice.reducer,

    },
});
