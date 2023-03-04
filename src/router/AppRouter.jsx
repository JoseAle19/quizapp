import { Routes, Route } from "react-router-dom";
import { Login } from "../auth/pages/Login";
import { PrivateRouter, PublicRouter } from "./";
import { QuizRouter } from "../quizApp/router/QuizRouter";
import { AuthRouter } from "../auth/router/AuthRouter";
export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <PrivateRouter>
            <QuizRouter />
          </PrivateRouter>
        }
      />

      <Route
        path="auth/*"
        element={
          <PublicRouter>
            <AuthRouter/>
          </PublicRouter>
        }
      />

      <Route path="*" element={<h1>Error 404</h1>} />
    </Routes>
  );
};
