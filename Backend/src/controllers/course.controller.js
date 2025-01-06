import { Course } from "../models/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

function validateDate(dateStr) {
  // Regular expression to check the format YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the date string matches the format
  if (!regex.test(dateStr)) {
    return false;
  }

  // Split the date string into components
  const [year, month, day] = dateStr.split("-").map(Number);

  // Create a new Date object
  const date = new Date(year, month - 1, day);

  // Check if the date object is valid
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

const createCourse = asyncHandler(async (req, res) => {
  const { courseName, semester, startDate, endDate, subjects } = req.body;

  const isStartDateValid = validateDate(startDate);
  const isEndDateValid = validateDate(endDate);

  if (new Date(startDate) > new Date(endDate)) {
    throw new ApiError(400, "end date must be ahead than start date");
  }

  if (!isStartDateValid || !isEndDateValid) {
    throw new ApiError(422, "Enter date in YYYY-MM-DD format or invalid date");
  }

  const isCourseExists = await Course.findOne({
    courseName,
    semester,
  });

  if (isCourseExists) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "course already exists"));
  }

  const newCourse = await Course.create({
    courseName,
    semester,
    startDate,
    endDate,
    subjects,
    createdBy: req.user._id,
  });

  if (!newCourse) {
    throw new ApiError(500, "Failed to register course.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newCourse, "course registered successfully"));
});

const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { courseName, semester, startDate, endDate, subjects } = req.body;

  const isStartDateValid = validateDate(startDate);
  const isEndDateValid = validateDate(endDate);

  if (new Date(startDate) >= new Date(endDate)) {
    throw new ApiError(400, "end date must be greater than start date");
  }

  if (!isStartDateValid || !isEndDateValid) {
    throw new ApiError(422, "Enter date in YYYY-MM-DD format or invalid date");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "course not found");
  }

  if (course.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this course");
  }

  course.courseName = courseName;
  course.semester = semester;
  course.startDate = startDate;
  course.endDate = endDate;
  course.subjects = subjects;
  course.createdBy = req.user._id;

  const newUpdatedCourse = await course.save();

  if (!newUpdatedCourse) {
    throw new ApiError(500, "Failed to update course");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, newUpdatedCourse, "course updated successfully")
    );
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const { password } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user password");
  }

  const areUserExistsWithThisCourse = await User.find({
    course: req.user?.course,
  });

  if (areUserExistsWithThisCourse.length) {
    throw new ApiError(
      400,
      "Please make sure you moved all your users to new course first"
    );
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "course not found");
  }

  if (course.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this course");
  }

  const deleteRegisteredCourse = await course.deleteOne();

  if (!deleteRegisteredCourse.deletedCount) {
    throw new ApiError(500, "Failed to delete course");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "course deleted successfully"));
});

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();

  if (!courses || !courses.length) {
    throw new ApiError(404, "No course is registered");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "course fetched successfully"));
});

const getAllUsersEnrolledInCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "course does not exists");
  }

  const [totalUsers, users] = await Promise.all([
    User.countDocuments({ course: course._id }), // Count total users
    User.find({ course: course._id })
      .select("fullName avatar email") // Fetch only required fields
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean(), // Fetch paginated users
  ]);

  if (!users.length && page <= 1) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No users are enrolled in this course"));
  }

  if (!users.length) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, [], "No more users are enrolled in this course")
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { users, totalUsers }, "users fetched successfully")
    );
});

export {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getAllUsersEnrolledInCourse,
};
