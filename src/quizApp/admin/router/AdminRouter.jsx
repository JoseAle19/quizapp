import { Routes, Route, Navigate } from "react-router-dom";
import { AdminDashBoardPage, HistoryPage} from "../pages";

export const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/home-admin" element={<AdminDashBoardPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/*" element={<Navigate to={"home-admin"} />} />
    </Routes>
  );
};
