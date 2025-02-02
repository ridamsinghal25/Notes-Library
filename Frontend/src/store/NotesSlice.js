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

      let currentChapter = state.userNotes.find((ch) =>
        ch.mergedNotes.some((note) => note._id === noteId)
      );

      if (!currentChapter) return;

      const noteIndex = currentChapter.mergedNotes.findIndex(
        (note) => note._id === noteId
      );

      const noteToUpdate = currentChapter.mergedNotes[noteIndex];

      const updatedNote = {
        ...noteToUpdate,
        ...newNotes,
      };

      currentChapter.mergedNotes[noteIndex] = updatedNote;
    },
    deleteNotes: (state, action) => {
      const noteId = action.payload;

      let currentChapter = state.userNotes.find((ch) =>
        ch.mergedNotes.some((note) => note._id === noteId)
      );

      if (!currentChapter) return;

      const updatedNotes = currentChapter.mergedNotes.filter(
        (note) => note._id !== noteId
      );

      currentChapter.mergedNotes = updatedNotes;
    },
    toggleLikeState: (state, action) => {
      const { chapterNumber, subject, noteId, isLiked } = action.payload;

      // Find the chapter
      const chapter = state.userNotes.find(
        (ch) => ch.chapterNumber === chapterNumber && ch.subject === subject
      );

      if (chapter) {
        // Find the note in mergedNotes
        const note = chapter.mergedNotes.find((note) => note._id === noteId);

        if (note) {
          // Update note's like state and count
          note.isLiked = isLiked;
          note.likesCount += isLiked ? 1 : -1;
        }
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
