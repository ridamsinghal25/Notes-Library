import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getComment } from "../models/comment.model.js";
import { getNotes } from "../models/notes.model.js";

const createComment = asyncHandler(async (req, res) => {
  const Comment = await getComment();
  const Notes = await getNotes();

  const { notesId } = req.params;
  const { content } = req.body;

  const notesExists = await Notes.findById(notesId);

  if (!notesExists) {
    throw new ApiError(404, "Notes does not exists");
  }

  const newComment = await Comment.create({
    content,
    owner: req.user?._id,
    notesId,
  });

  if (!newComment) {
    throw new ApiError(500, "failed to create comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newComment, "comment created successfully"));
});

const editComment = asyncHandler(async (req, res) => {
  const Comment = await getComment();

  const { commentId } = req.params;
  const { content } = req.body;

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    { new: true }
  );

  if (!updatedComment) {
    throw new ApiError(500, "This comment does not exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const Comment = await getComment();

  const { commentId } = req.params;

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) {
    throw new ApiError(500, "This comment does not exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "comment deleted successfully"));
});

const getComments = asyncHandler(async (req, res) => {
  const Comment = await getComment();
  const Notes = await getNotes();

  const { notesId } = req.params;

  const notesExists = await Notes.findById(notesId);

  if (!notesExists) {
    throw new ApiError(404, "These notes does not exists");
  }

  const comments = await Comment.find({ notesId });

  if (!comments || comments.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No comments posted"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "comments fetched successfully"));
});

export { createComment, editComment, deleteComment, getComments };
