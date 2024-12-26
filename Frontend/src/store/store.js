import { configureStore } from "@reduxjs/toolkit";
import NotesSlice from "./NotesSlice";
import AuthSlice from "./AuthSlice";
import ThemeSlice from "./ThemeSlice";
import ModalSlice from "./ModalSlice";
import PasswordSlice from "./PasswordSlice";
import CourseSlice from "./CourseSlice";
import CommentSlice from "./CommentSlice";
import ProfileSlice from "./ProfileSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    notes: NotesSlice,
    theme: ThemeSlice,
    modal: ModalSlice,
    password: PasswordSlice,
    courses: CourseSlice,
    comment: CommentSlice,
    profile: ProfileSlice,
  },
});

export default store;
