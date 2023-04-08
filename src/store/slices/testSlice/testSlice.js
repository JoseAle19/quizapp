// TODO : Falta el endpoint de la API
import { createSlice } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    isLoading: false,
    tests: [],
  },
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setTest: (state, { payload }) => {
      state.tests = payload;
    },
  },
});
export const { setIsLoading, setTest } = testSlice.actions;
 