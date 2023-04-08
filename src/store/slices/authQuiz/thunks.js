import { removeStateCategory } from "../categoriesQuiz/thunks";
import { removeStateTets } from "../testSlice/thunks";
import { checkingCredentials, login, statusRegister } from "./AuthSlice";
import { serviceAuthLogin } from "./services";
import { serviceRegister } from "./services";

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
      dispatch(
        login({
          status: "authenticated",
          user: { ...res.user, token: res.userToken },
        })
      );
    } else {
      dispatch(login({ status: "no-authenticated", error: res.error }));
    }
    return res;
  };
};
// Cerrar sesión y elimanr todo el state de cada uno de os reducers
export const quizLogout = () => {
  return async (dispatch) => {
    dispatch(login({ status: "no-authenticated", user: null }));
    // dispatch(removeStateCategory())
    // dispatch(removeStateTets())
  };
};

export const registerTeam = (data) => {
  const {
    nameAdviser,
    emailAdviser,
    passwordAdviser,
    phoneAdviser,
    institutionAdviser,
    idrol,
    students,
    nameTeam,
  } = data;
  const dataTeam = {
    nameAdviser,
    email: emailAdviser,
    pass: passwordAdviser,
    institution: institutionAdviser,
    phone: phoneAdviser,
    idrol,
    nameTeam,
    students: [
      {
        name: students[0].student1,
        isLeader: students[0].isLeader,
      },
      {
        name: students[1].student2,
        isLeader: students[1].isLeader,
      },
      {
        name: students[2].student3,
        isLeader: students[2].isLeader,
      },
    ],
  };

  return async (dispatch) => {
    dispatch(statusRegister(true));
    const data = await serviceRegister(dataTeam);
    if (data) {
      dispatch(statusRegister(false));
    }

    return data;
  };
};
