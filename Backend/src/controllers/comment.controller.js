import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";
import { Notes } from "../models/notes.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const createComment = asyncHandler(async (req, res) => {
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
    commentedBy: user?._id,
    notesId,
  });

  if (!newComment._id) {
    throw new ApiError(500, "failed to create comment");
  }

  newComment.commentedBy = user;

  return res
    .status(200)
    .json(new ApiResponse(200, newComment, "comment created successfully"));
});

const editComment = asyncHandler(async (req, res) => {
  const user = req?.user;

  const { commentId } = req.params;
  const { content } = req.body;

  if (!user) {
    throw new ApiError(404, "user does not exists");
  }

  const comment = await Comment.findOneAndUpdate(
    {
      _id: commentId,
      commentedBy: user._id,
    },
    {
      $set: {
        content,
      },
    },
    { new: true }
  );

  if (!comment) {
    throw new ApiError(404, "comment does not exists");
  }

  comment.commentedBy = user;

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const user = req?.user;

  const { commentId } = req.params;

  if (!user) {
    throw new ApiError(404, "user does not exists");
  }

  const comment = await Comment.findOneAndDelete({
    _id: commentId,
    commentedBy: user._id,
  });

  if (!comment) {
    throw new ApiError(404, "comment does not exists");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "comment deleted successfully"));
});

const getComments = asyncHandler(async (req, res) => {
  const { notesId } = req.params;

  const notesExists = await Notes.findById(notesId);

  if (!notesExists) {
    throw new ApiError(404, "These notes does not exists");
  }

  const comments = await Comment.find({ notesId }).lean();

  if (!comments || comments.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No comments posted"));
  }
  const ownerIds = comments.map((comment) => comment.commentedBy);

  const uniqueOwnerIds = [...new Set(ownerIds)];

  const users = await User.find({ _id: { $in: uniqueOwnerIds } })
    .select("fullName avatar _id role")
    .lean();

  const userMap = users.reduce((map, user) => {
    map[user._id] = user;
    return map;
  }, {});

  const commentsWithOwners = comments.map((comment) => ({
    ...comment,
    commentedBy: userMap[comment.commentedBy] || null,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(200, commentsWithOwners, "comments fetched successfully")
    );
});

const getCommentsByUser = asyncHandler(async (req, res) => {
  const comments = await Comment.aggregate([
    {
      $match: {
        commentedBy: new mongoose.Types.ObjectId(`${req.user?._id}`),
      },
    },
    {
      $lookup: {
        from: "notes",
        localField: "notesId",
        foreignField: "_id",
        as: "notes",
      },
    },
    {
      $unwind: "$notes",
    },
    {
      $set: {
        commentedBy: req.user,
      },
    },
    {
      $project: {
        content: 1,
        "commentedBy.fullName": 1,
        "commentedBy.role": 1,
        "commentedBy.avatar": 1,
        "notes.subject": 1,
        "notes.chapterName": 1,
        "notes.pdf": 1,
      },
    },
  ]);

  if (!comments) {
    throw new ApiError(404, "notes does not exists");
  }

  if (Array.isArray(comments) && comments?.length === 0) {
    return res
      .status(201)
      .json(
        new ApiResponse(201, [], "you have not commented on any notes yet")
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "comments fetched successfully"));
});

export {
  createComment,
  editComment,
  deleteComment,
  getComments,
  getCommentsByUser,
};
