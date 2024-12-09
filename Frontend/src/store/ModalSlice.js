import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    notesModal: false,
    forgotPasswordEmailModal: false,
    verificationEmailModal: false,
    avatarUploadModal: false,
    deleteModal: false,
    updatePdfFileModal: false,
    showPdfModal: false,
    updateSemesterModal: false,
    commentModal: false,
    courseModal: false,
  },
  selectedNotes: {},
  selectedCourse: { kdjflkd: 2 },
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
