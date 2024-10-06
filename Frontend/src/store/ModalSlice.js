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
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      const { modalType } = action.payload;

      state.modals[modalType] = !state.modals[modalType];
    },
  },
});

export const { toggleModal } = ModalSlice.actions;

export default ModalSlice.reducer;