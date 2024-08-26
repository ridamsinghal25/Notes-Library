import { configureStore } from "@reduxjs/toolkit";
import NotesSlice from "./NotesSlice";
import AuthSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    notes: NotesSlice,
  },
});

export default store;
