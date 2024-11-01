import { configureStore } from "@reduxjs/toolkit";
import NotesSlice from "./NotesSlice";
import AuthSlice from "./AuthSlice";
import ThemeSlice from "./ThemeSlice";
import ModalSlice from "./ModalSlice";
import PasswordSlice from "./PasswordSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    notes: NotesSlice,
    theme: ThemeSlice,
    modal: ModalSlice,
    password: PasswordSlice,
  },
});

export default store;
