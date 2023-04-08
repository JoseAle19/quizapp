import "../css/logout.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { quizLogout } from "../../store/slices/authQuiz/thunks";
export const Logout = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.clear();
    dispatch(quizLogout())
    navigate("/auth/login");
  };
  return (
    <div>
      <button onClick={() => handleLogOut()} className="Logout-btnlogout">
        Cerrar sesión
      </button>
    </div>
  );
};
