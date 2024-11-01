import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPassword: false,
};

const PasswordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
  },
});

export const { toggleShowPassword } = PasswordSlice.actions;

export default PasswordSlice.reducer;
