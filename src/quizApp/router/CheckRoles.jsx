import { useSelector } from "react-redux";
import { StudentRouter } from "../student/router/StudentRouter";
import { TeacherRouter } from "../teacher/router/TeacherRouter";
import { AdminRouter } from "../admin/router/AdminRouter";

export const CheckRoles = () => {
  const { user } = useSelector((state) => state.auth);
  
  if (user.idrol === 1) {
    return <StudentRouter />;
  }
  if (user.idrol === 2) {
    return <TeacherRouter />;
  }
  if (user.idrol === 3) {
    return <AdminRouter />;
  }
};
