import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRouter = ({ children }) => {
  // redux
  const { status } = useSelector((state) => state.auth);

  return ( status === 'authenticated') ? children : <Navigate to='/auth/login' /> ;
};
