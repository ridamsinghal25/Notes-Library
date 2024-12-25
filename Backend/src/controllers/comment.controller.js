import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getComment } from "../models/comment.model.js";
import { getNotes } from "../models/notes.model.js";
import { getUser } from "../models/user.model.js";

const createComment = asyncHandler(async (req, res) => {
  const Comment = await getComment();
  const Notes = await getNotes();
  const user = req?.user;

  const { notesId } = req.params;
  const { content } = req.body;

  if (!user) {
    throw new ApiError(404, "user does not exists");
  }

  const notesExists = await Notes.findById(notesId);

  if (!notesExists) {
    throw new ApiError(404, "Notes does not exists");
  }

  const newComment = await Comment.create({
    content,
    owner: user?._id,
    notesId,
  });

  if (!newComment._id) {
    throw new ApiError(500, "failed to create comment");
  }

  newComment.owner = user;

  return res
    .status(200)
    .json(new ApiResponse(200, newComment, "comment created successfully"));
});

const editComment = asyncHandler(async (req, res) => {
  const Comment = await getComment();
  const user = req?.user;

  const { commentId } = req.params;
  const { content } = req.body;

  if (!user) {
    throw new ApiError(404, "user does not exists");
  }

  const comment = await Comment.findById(commentId);

  if (!comment._id) {
    throw new ApiError(404, "comment does not exists");
  }

  if (comment.owner.toString() !== user._id.toString()) {
    throw new ApiError(403, "You are not allowed to edit this comment");
  }

  comment.content = content;

  const updatedComment = await comment.save();

  if (!updatedComment._id) {
    throw new ApiError(500, "failed to update comment");
  }

  updatedComment.owner = user;

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const Comment = await getComment();
  const user = req?.user;

  const { commentId } = req.params;

  if (!user) {
    throw new ApiError(404, "user does not exists");
  }

  const comment = await Comment.findById(commentId);

  if (!comment._id) {
    throw new ApiError(404, "comment does not exists");
  }

  if (comment.owner.toString() !== user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this comment");
  }

  const deletedComment = await comment.deleteOne();

  if (!deletedComment.deletedCount) {
    throw new ApiError(500, "Failed to delete comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "comment deleted successfully"));
});

const getComments = asyncHandler(async (req, res) => {
  const Comment = await getComment();
  const Notes = await getNotes();
  const User = await getUser();

  const { notesId } = req.params;

  const notesExists = await Notes.findById(notesId);

  if (!notesExists) {
    throw new ApiError(404, "These notes does not exists");
  }

  const comments = await Comment.find({ notesId });

  const ownerIds = comments.map((comment) => comment.owner);
  const users = await User.find({ _id: { $in: ownerIds } });

  const userMap = users.reduce((map, user) => {
    map[user._id] = user;
    return map;
  }, {});

  const commentsWithOwners = comments.map((comment) => ({
    ...comment.toObject(),
    owner: userMap[comment.owner] || null,
  }));

  if (!comments || comments.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No comments posted"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, commentsWithOwners, "comments fetched successfully")
    );
});

export { createComment, editComment, deleteComment, getComments };
