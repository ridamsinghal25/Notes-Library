import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userDetails: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.isLoggedIn = true), (state.userDetails = action.payload);
    },
    logout: (state) => {
      (state.isLoggedIn = false), (state.userDetails = null);
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice;
