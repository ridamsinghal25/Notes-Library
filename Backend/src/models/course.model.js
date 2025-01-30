import mongoose from "mongoose";
import { getAuthConnection } from "../db/db.js";

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: [true, "Subject name is required"],
    trim: true,
  },
  chapters: {
    type: [String],
    required: [true, "Subject chapters are required"],
  },
});

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, "Course name is required"],
    trim: true,
  },
  semester: {
    type: String,
    required: [true, "Course semester is required"],
  },
  subjects: [subjectSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "created by field is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
  },
});

let Course;
const getCourse = () => {
  try {
    const authConnection = getAuthConnection();

    Course = authConnection.model("Course", courseSchema);
  } catch (error) {
    console.error("Failed to initialize Course model:", error);
    throw error;
  }
};

export { Course, getCourse };
