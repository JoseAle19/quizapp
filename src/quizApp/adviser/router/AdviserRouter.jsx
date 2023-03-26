import {  Route, Routes, Navigate } from "react-router-dom";
import { AdviserDashBoardPage } from "../pages/AdviserDashBoardPage";
export const AdviserRouter = () => {
  return (
    <Routes>
        <Route path="/home-leader" element={<AdviserDashBoardPage />} />
        {/* <Route path="/:id" element={<AdviserHome />} /> */}
        <Route path="/*" element={<Navigate to={"/home-leader"} />} />
    </Routes>

  )
}
