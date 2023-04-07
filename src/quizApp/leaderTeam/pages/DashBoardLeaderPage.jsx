import { NavBarLeader } from "../ui/NavBarLeader";
import {} from "../css/NavBarLeader.css";
import { useSelector } from "react-redux";
export const DashBoardLeaderPage = () => {
    const { user } = useSelector((state) => state.auth);

  return (
    <div>
        <NavBarLeader />
      <div className="DashBoardPage-container">
        <p className="leader">Hola {user.name}</p>
      </div>
    </div>
  );
};
