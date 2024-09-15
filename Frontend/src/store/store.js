import { configureStore } from "@reduxjs/toolkit";
import NotesSlice from "./NotesSlice";
import AuthSlice from "./AuthSlice";
import ThemeSlice from "./ThemeSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    notes: NotesSlice,
    theme: ThemeSlice,
  },
});

export default store;
