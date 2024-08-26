import ApiError from "../services/ApiError";
import NotesService from "../services/NotesService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (subject) => {
    const response = await NotesService.getNotesBySubject(subject);

    if (!(response instanceof ApiError)) {
      return response;
    } else {
      return null;
    }
  }
);

const initialState = {
  userNotes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.userNotes = action.payload;
    });
  },
});

export default notesSlice.reducer;
