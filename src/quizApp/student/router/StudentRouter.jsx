import { Routes, Route, Navigate } from "react-router-dom";
import { StudentDashBoardPage } from "../pages/StudentDashBoardPage";
import { TestPage } from "../pages/TestPage";

export const StudentRouter = () => {
  return (
    <Routes>
      <Route path="/home-student" element={<StudentDashBoardPage />} />
      <Route path="/test" element={<TestPage />} />

      <Route path="/*" element={<Navigate to={'home-student'} />} />
    </Routes>
  );
};
