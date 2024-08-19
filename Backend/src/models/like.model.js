import mongoose from "mongoose";

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

export const Like = mongoose.model("Like", likeSchema);
