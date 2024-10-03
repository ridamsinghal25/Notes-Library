import { configureStore } from "@reduxjs/toolkit";
import NotesSlice from "./NotesSlice";
import AuthSlice from "./AuthSlice";
import ThemeSlice from "./ThemeSlice";
import ModalSlice from "./ModalSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    notes: NotesSlice,
    theme: ThemeSlice,
    modal: ModalSlice,
  },
});

export default store;
