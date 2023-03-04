import { Routes, Route, Navigate } from "react-router-dom";
import { TeacherDashBoradPage } from "../pages/TeacherDashBoradPage";
import { CreateQuestion } from "../pages/CreateQuestion";
import { QuestionsPage } from "../pages/QuestionsPage";
import { AddStudents } from "../pages/AddStudents";
export const TeacherRouter = () => {
  return (
    <Routes>
      <Route path="/home-teacher" element={<TeacherDashBoradPage />} />
      <Route path="/teacher-question" element={<CreateQuestion />} />
      <Route path="/teacher-getquestions" element={<QuestionsPage />} />
      <Route path="/teacher-addStudents" element={<AddStudents />} />
      <Route path="/*" element={<Navigate to={"home-teacher"} />} />
    </Routes>
  );
};
