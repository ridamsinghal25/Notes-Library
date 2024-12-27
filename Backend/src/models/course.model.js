import mongoose from "mongoose";
import { getAuthConnection } from "../db/db.js";

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
  subjects: {
    type: [String],
    required: [true, "course subjects are required"],
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
