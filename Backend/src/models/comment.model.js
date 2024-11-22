import mongoose from "mongoose";
import mongoDBManager from "../db/db.js";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "content is required"],
      trim: true,
    },
    owner: {
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

const getComment = async () => {
  const notesLibraryConnection =
    await mongoDBManager.getNotesLibraryConnection();

  const CommentModel =
    notesLibraryConnection.models.Comment ||
    notesLibraryConnection.model("Comment", commentSchema);

  return CommentModel;
};

export { getComment };
