import { useSelector } from "react-redux";
import { StudentRouter } from "../student/router/StudentRouter";
import { TeacherRouter } from "../teacher/router/TeacherRouter";
import { AdminRouter } from "../admin/router/AdminRouter";
import { AdviserRouter } from "../adviser/router/AdviserRouter";
import { LeaderRouter } from "../leaderTeam/router/LeaderRouter";

export const CheckRoles = () => {
  const { user } = useSelector((state) => state.auth);
  
  if (user.idrol === 1) {
    return <LeaderRouter />;
  }
  if (user.idrol === 2) {
    return <StudentRouter />;
  }
  if (user.idrol === 3) {
    return <TeacherRouter />;
  }
  if (user.idrol === 4) {
    return <AdminRouter />;
  }
  if (user.idrol === 5) {
    return <AdviserRouter />;
  }
};
