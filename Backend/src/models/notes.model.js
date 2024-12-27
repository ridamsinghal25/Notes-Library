import mongoose from "mongoose";
import { getNotesLibraryConnection } from "../db/db.js";

const notesSchema = new mongoose.Schema(
  {
    chapterNumber: {
      type: Number,
      required: [true, "chapter number is required"],
      trim: true,
    },
    chapterName: {
      type: String,
      required: [true, "chapter name is required"],
      trim: true,
    },
    owner: {
      type: String,
      required: [true, "owner of notes is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "created by field is required"],
    },
    pdf: {
      public_id: String,
      url: String,
    },
    subject: {
      type: String,
      required: [true, "subject is required"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

notesSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

let Notes;
const getNotes = () => {
  try {
    const notesLibraryConnection = getNotesLibraryConnection();

    Notes = notesLibraryConnection.model("Notes", notesSchema);
  } catch (error) {
    console.error("Failed to initialize User model:", error);
    throw error;
  }
};

export { Notes, getNotes };
