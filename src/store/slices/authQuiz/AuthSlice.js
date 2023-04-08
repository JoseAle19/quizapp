import { createSlice } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? {
      statusRegister: null,
      errorRegister: null,
      status: "authenticated",
      user,
      error: null,
    }
  : {
      statusRegister: null,
      errorRegister: null,
      status: "no-authenticated",
      user: null,
      error: null,
    };

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = payload?.status;
      state.user = payload.user;
      state.error = payload.error;
    },
    logOut: (state) => {
      state.status = "no-authenticated";
      
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    statusRegister: (state, { payload }) => {
      
      state.statusRegister = payload;
    },
  },
});
export const { login, logOut, checkingCredentials, statusRegister } = authSlice.actions;
