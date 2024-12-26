import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  likedNotes: [],
  comments: [],
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setLikedNotes: (state, action) => {
      state.likedNotes = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { setNotes, setLikedNotes, setComments } = ProfileSlice.actions;

export default ProfileSlice.reducer;
