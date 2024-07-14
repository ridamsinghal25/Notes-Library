import mongoose, { Schema } from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    chapterName: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "creator of notes is required"],
    },
    pdf: {
      public_id: String,
      url: String,
    },
    subject: {
      type: String,
      required: [true, "subject is required"],
    },
  },
  { timestamps: true }
);

notesSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Notes = mongoose.model("Notes", notesSchema);
