import { Routes, Route, Navigate } from "react-router-dom";
import { CreateQuestion, CreateTest, QuestionsPage, TeacherDashBoradPage} from "../pages";
export const TeacherRouter = () => {
  return (
    <Routes>
      <Route path="/home-teacher" element={<TeacherDashBoradPage />} />
      <Route path="/teacher-question" element={<CreateQuestion />} />
      <Route path="/teacher-getquestions" element={<QuestionsPage />} />
      <Route path="/create-test" element={<CreateTest />} />
      <Route path="/*" element={<Navigate to={"home-teacher"} />} />
    </Routes>
  );
};
