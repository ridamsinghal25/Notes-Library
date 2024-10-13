import mongoose from "mongoose";
import mongoDBManager from "../db/db.js";

const likeSchema = new mongoose.Schema({
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notes",
  },
});

const getLike = async () => {
  const notesLibraryConnection =
    await mongoDBManager.getNotesLibraryConnection();

  const LikeModel =
    notesLibraryConnection.models.Like ||
    notesLibraryConnection.model("Like", likeSchema);

  return LikeModel;
};

export { getLike };
