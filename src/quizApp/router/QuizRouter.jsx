import { Routes, Route } from "react-router-dom";
import { CheckRoles } from "./CheckRoles";

export const QuizRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<CheckRoles />} />
    </Routes>
  );
};
