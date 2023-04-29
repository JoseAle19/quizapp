import { Routes, Route, Navigate } from "react-router-dom";
import { DashBoardLeaderPage } from "../pages/DashBoardLeaderPage";
import { LeaderTest } from "../pages/LeaderTest";
import { DoingTest } from "../pages/DoingTest";
export const LeaderRouter = () => {
  return (
    <Routes>
      <Route path="/home-leader" element={<DashBoardLeaderPage />}></Route>
      <Route path="/test-leader" element={<LeaderTest />}></Route>
      <Route path="/doing-test/:id/:duration" element={<DoingTest />}></Route>

      <Route path="/*" element={<Navigate to={"/home-leader"} />}></Route>
    </Routes>
  );
};

