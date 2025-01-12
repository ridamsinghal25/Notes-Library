import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    forgotPasswordEmailModal: false,
    verificationEmailModal: false,
    avatarUploadModal: false,
    deleteCourseModal: false,
    deleteModal: false,
    deleteSubjectNotesModal: false,
    showPdfModal: false,
    updateSemesterModal: false,
    commentModal: false,
    courseModal: false,
    courseUsersModal: false,
  },
  selectedNotes: {},
  selectedCourse: {},
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      const { modalType } = action.payload;

      state.modals[modalType] = !state.modals[modalType];
    },
    setSelectedNotes: (state, action) => {
      state.selectedNotes = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
});

export const { toggleModal, setSelectedNotes, setSelectedCourse } =
  ModalSlice.actions;

export default ModalSlice.reducer;
