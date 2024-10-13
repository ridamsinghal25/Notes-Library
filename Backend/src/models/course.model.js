import mongoose from "mongoose";
import mongoDBManager from "../db/db.js";

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

const getCourse = async () => {
  const authConnection = await mongoDBManager.getAuthConnection();

  const CourseModel =
    authConnection.models.Course ||
    authConnection.model("Course", courseSchema);

  return CourseModel;
};

export { getCourse };
