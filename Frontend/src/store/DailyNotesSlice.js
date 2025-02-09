import DailyNotesService from "@/services/DailyNotesService";
import ApiError from "../services/ApiError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDailyNotes = createAsyncThunk(
  "dailyNotes/fetchNotes",
  async ({ subject, chapterName }, { getState }) => {
    const { dailyNotes } = getState();

    const previousChapterNotes = dailyNotes.notes?.[0]?.chapterName;

    if (previousChapterNotes === chapterName) {
      return dailyNotes.notes;
    }

    const response = await DailyNotesService.getNotes({ subject, chapterName });

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
  notes: [],
  error: null,
  status: "idle",
};

const DailyNotesSlice = createSlice({
  name: "dailyNotes",
  initialState,
  reducers: {
    resetDailyNotesState: () => initialState,
    addNotes: (state, action) => {
      state.notes.unshift(action.payload);
    },
    deleteNotes: (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    updateNotes: (state, action) => {
      const { dailyNotesId, newUpdatedNotes } = action.payload;

      state.notes = state.notes.map((note) =>
        note._id === dailyNotesId ? newUpdatedNotes : note
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDailyNotes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchDailyNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(fetchDailyNotes.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
      state.notes = [];
    });
  },
});

export const { deleteNotes, updateNotes, resetDailyNotesState, addNotes } =
  DailyNotesSlice.actions;

export default DailyNotesSlice.reducer;
