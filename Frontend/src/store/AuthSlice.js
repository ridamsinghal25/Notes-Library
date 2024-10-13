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
      localStorage.removeItem("accessToken");
      return { ...initialState, isLogInCheckDone: true };
    },
    updateUserDetails: (state, action) => {
      const course = state.userDetails.course;

      state.userDetails = { ...action.payload, course };
    },
  },
});

export const { login, logout, updateLoginCheckDone, updateUserDetails } =
  AuthSlice.actions;
export default AuthSlice.reducer;
