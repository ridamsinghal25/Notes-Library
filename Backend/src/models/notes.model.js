import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    chapterNumber: {
      type: String,
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

export const Notes = mongoose.model("Notes", notesSchema);
