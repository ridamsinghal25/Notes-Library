import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setAppTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setAppTheme } = themeSlice.actions;

export default themeSlice.reducer;
