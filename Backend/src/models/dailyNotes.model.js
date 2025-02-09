import mongoose from "mongoose";
import { getNotesLibraryConnection } from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";

const dailyNotesSchema = new mongoose.Schema(
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
    subject: {
      type: String,
      required: [true, "subject is required"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    notes: [
      {
        public_id: String,
        url: String,
        name: String,
        size: Number,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "created by field is required"],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

dailyNotesSchema.pre("save", async function (next) {
  if (!this.isModified("notes")) return next();

  if (this.notes.length > 10) {
    throw new ApiError(400, "You cannot upload more than 10 files");
  }

  next();
});

let DailyNotes;
const getDailyNotes = () => {
  try {
    const notesLibraryConnection = getNotesLibraryConnection();

    DailyNotes = notesLibraryConnection.model("DailyNotes", dailyNotesSchema);
  } catch (error) {
    console.error("Failed to initialize User model:", error);
    throw error;
  }
};

export { DailyNotes, getDailyNotes };
