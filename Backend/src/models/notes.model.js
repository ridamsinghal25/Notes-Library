import mongoose from "mongoose";
import mongoDBManager from "../db/db.js";

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

const getNotes = async () => {
  const notesLibraryConnection =
    await mongoDBManager.getNotesLibraryConnection();

  const NotesModel =
    notesLibraryConnection.models.Notes ||
    notesLibraryConnection.model("Notes", notesSchema);

  return NotesModel;
};

export { getNotes };
