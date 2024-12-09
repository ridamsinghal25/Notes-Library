import CommentService from "@/services/CommentService";
import ApiError from "../services/ApiError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (notesId) => {
    const response = await CommentService.getComments(notesId);

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
  comments: [],
  error: null,
  status: "idle",
};

const CommentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },
    updateComment: (state, action) => {
      const { commentId, newComment } = action.payload;
      state.comments = state.comments.map((comment) =>
        comment._id === commentId ? newComment : comment
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addComment, deleteComment, updateComment } =
  CommentSlice.actions;

export default CommentSlice.reducer;
