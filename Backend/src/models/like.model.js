import mongoose from "mongoose";
import { getNotesLibraryConnection } from "../db/db.js";

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

let Like;
const getLike = () => {
  try {
    const notesLibraryConnection = getNotesLibraryConnection();

    Like = notesLibraryConnection.model("Like", likeSchema);
  } catch (error) {
    console.error("Failed to initialize User model:", error);
    throw error;
  }
};

export { Like, getLike };
