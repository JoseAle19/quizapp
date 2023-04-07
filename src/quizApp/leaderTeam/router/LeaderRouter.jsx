import { Routes, Route, Navigate } from "react-router-dom";
import { DashBoardLeaderPage } from "../pages/DashBoardLeaderPage";
import { LeaderTest } from "../pages/LeaderTest";
export const LeaderRouter = () => {
  return (
    <Routes>
      <Route path="/home-leader" element={<DashBoardLeaderPage />}></Route>
      <Route path="/test-leader" element={<LeaderTest />}></Route>

      <Route path="/*" element={<Navigate to={"/home-leader"} />}></Route>
    </Routes>
  );
};

