import { Routes, Route, Navigate } from "react-router-dom";
import { AdminDashBoardPage, HistoryPage} from "../pages";
import { TableTest } from "../pages/TableTest";

export const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/home-admin" element={<AdminDashBoardPage />} />
      <Route path="/questions-test/:id" element={<TableTest />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/*" element={<Navigate to={"home-admin"} />} />
    </Routes>
  );
};
