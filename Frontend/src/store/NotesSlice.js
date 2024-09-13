import ApiError from "../services/ApiError";
import NotesService from "../services/NotesService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (subject) => {
    const response = await NotesService.getNotesBySubject(subject);

    if (!(response instanceof ApiError)) {
      return response?.data;
    } else {
      throw new Error(
        response?.errorResponse?.message || response?.errorMessage
      );
    }
  }
);

const initialState = {
  userNotes: [],
  error: null,
  status: "idle",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.userNotes = action.payload;
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
      state.userNotes = [];
    });
  },
});

export default notesSlice.reducer;
