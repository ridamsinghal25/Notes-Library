import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    emailModal: false,
    avatarUploadModal: false,
    deleteCourseModal: false,
    deleteModal: false,
    deleteSubjectNotesModal: false,
    deleteChapterNotesModal: false,
    updateSemesterModal: false,
    imageCropModal: false,
  },
  selectedNotesId: null,
  selectedCourseId: null,
  selectedImageFile: null,
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
      state.selectedNotesId = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourseId = action.payload;
    },
    setSelectedImageFile: (state, action) => {
      state.selectedImageFile = action.payload;
    },
  },
});

export const {
  toggleModal,
  setSelectedNotes,
  setSelectedCourse,
  setSelectedImageFile,
} = ModalSlice.actions;

export default ModalSlice.reducer;
