import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isLogInCheckDone: false,
  userDetails: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload;
    },
    updateLoginCheckDone: (state, action) => {
      state.isLogInCheckDone = action.payload;
    },
    logout: () => {
      return { ...initialState, isLogInCheckDone: true };
    },
  },
});

export const { login, logout, updateLoginCheckDone } = AuthSlice.actions;
export default AuthSlice.reducer;
