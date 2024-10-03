import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  modals: {
    uploadNotesModal: false,
    forgotPasswordEmailModal: false,
    verificationEmailModal: false,
    uploadAvatarModal: false,
    deleteNotesModal: false,
    updatePdfFileModal: false,
    showPdfModal: false,
    updateSemesterModal: false,
    emailModal: false,
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
