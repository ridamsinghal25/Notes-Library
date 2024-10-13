import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    notesModal: false,
    forgotPasswordEmailModal: false,
    verificationEmailModal: false,
    avatarUploadModal: false,
    deleteNotesModal: false,
    updatePdfFileModal: false,
    showPdfModal: false,
    updateSemesterModal: false,
  },
  selectedNotes: {},
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
  },
});

export const { toggleModal, setSelectedNotes } = ModalSlice.actions;

export default ModalSlice.reducer;
