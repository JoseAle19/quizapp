import { Route, Routes, Navigate} from "react-router-dom";
import { Login } from "../pages/Login";
import { RegisterPage } from "../pages/RegisterPage";
export const AuthRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<Navigate to={'login'} />} />
    </Routes>

  )
}
