import { Routes, Route, Navigate } from "react-router-dom";
import { AdminDashBoardPage} from "../pages";

import { TableTest } from "../pages/TableTest";
import { GraficsPage } from "../components/Grafics";

export const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/home-admin" element={<AdminDashBoardPage />} />
      <Route path="/questions-test/:id" element={<TableTest />} />
      <Route path="/grafics/:id/:duration" element={<GraficsPage />} />
      <Route path="/*" element={<Navigate to={"home-admin"} />} />
    </Routes>
  );
};
