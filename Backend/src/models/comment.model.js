import mongoose from "mongoose";
import { getNotesLibraryConnection } from "../db/db.js";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "content is required"],
      trim: true,
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "owner field is required"],
    },
    notesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes",
      required: [true, "notes id field is required"],
    },
  },
  { timestamps: true }
);

let Comment;
const getComment = () => {
  try {
    const notesLibraryConnection = getNotesLibraryConnection();

    Comment = notesLibraryConnection.model("Comment", commentSchema);
  } catch (error) {
    console.error("Failed to initialize User model:", error);
    throw error;
  }
};

export { Comment, getComment };
