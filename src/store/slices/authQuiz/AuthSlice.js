import { createSlice } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: "authenticated", user, error: null}
  : { status: "no-authenticated", user: null, error: null };

export const authSlice = createSlice({

  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, {payload}) => {
      state.status = payload?.status;
      state.user = payload.user;
      state.error = payload.error;
    },
    logOut: (state) => {
      state.user = null;
    },
    checkingCredentials: (state) => {
      state.status = "checking"; 
    },
  },
});
export const { login, logOut, checkingCredentials} = authSlice.actions;
