import { checkingCredentials, login } from "./AuthSlice";
import { serviceAuthLogin } from "./services";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const quizLogin = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const res = await serviceAuthLogin(email, password);
    if (res.status) {
      dispatch(login({ status: "authenticated", user: {   ...res.user, token: res.userToken } }));
    } else {
      dispatch(login({ status: "no-authenticated", error: res.error }));
    }
    return res;
  };
};
