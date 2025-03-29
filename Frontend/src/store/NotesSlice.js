import ApiError from "../services/ApiError";
import NotesService from "../services/NotesService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (subject, { getState }) => {
    const { notes } = getState();

    const previousSubjectNotes = notes.userNotes?.[0]?.subject;

    if (previousSubjectNotes === subject?.subject) {
      return notes.userNotes;
    }

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
  reducers: {
    resetNotesState: () => initialState,
    updateNotesState: (state, action) => {
      const { noteId, newNotes } = action.payload;

      // Find the chapter
      let currentChapter = state.userNotes.find((ch) =>
        ch.notes.some((note) => note._id === noteId)
      );

      // Find the note
      if (!currentChapter) return;

      // Update the note
      const notes = currentChapter.notes.filter((note) => note._id === noteId);

      notes[0].owner = newNotes.owner;
      notes[0].pdf = newNotes.pdf;

      const updatedNotes = currentChapter.notes.map((note) =>
        note._id === noteId ? notes[0] : note
      );

      currentChapter.notes = updatedNotes;

      // If the subject is changed
      if (newNotes.subject !== state.userNotes[0]?.subject) {
        const updatedChapter = currentChapter.notes.filter(
          (note) => note._id !== noteId
        );

        currentChapter.notes = updatedChapter;
        return;
      }
    },
    deleteNotes: (state, action) => {
      const noteId = action.payload;

      let currentChapter = state.userNotes.find((ch) =>
        ch.notes.some((note) => note._id === noteId)
      );

      if (!currentChapter) return;

      const updatedNotes = currentChapter.notes.filter(
        (note) => note._id !== noteId
      );

      currentChapter.notes = updatedNotes;
    },
    toggleLikeState: (state, action) => {
      const { chapterNumber, noteId, isLiked } = action.payload;

      const chapter = state.userNotes.find(
        (chap) => chap.chapterNumber === chapterNumber
      );

      // Find the chapter
      const pdfNote = chapter.notes?.find((note) => note._id === noteId);

      if (pdfNote) {
        // Update pdfNote's like state and count
        pdfNote.isLiked = isLiked;
        pdfNote.likesCount += isLiked ? 1 : -1;
      }
    },
  },
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

export const {
  resetNotesState,
  updateNotesState,
  deleteNotes,
  toggleLikeState,
} = notesSlice.actions;

export default notesSlice.reducer;
