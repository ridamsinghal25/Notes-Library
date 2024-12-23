import { getCourse } from "../models/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
  const Course = await getCourse();

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
  });

  if (!newCourse) {
    throw new ApiError(500, "Failed to register course.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newCourse, "course registered successfully"));
});

const updateCourse = asyncHandler(async (req, res) => {
  const Course = await getCourse();

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

  const isCourseExists = await Course.findById(courseId);

  if (!isCourseExists) {
    throw new ApiError(404, "course not found");
  }

  const newUpdatedCourse = await Course.findByIdAndUpdate(
    isCourseExists._id,
    {
      $set: {
        courseName,
        semester,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        subjects,
      },
    },
    { new: true }
  );

  if (!newUpdatedCourse) {
    throw new ApiError(404, "course not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, newUpdatedCourse, "course updated successfully")
    );
});

const deleteCourse = asyncHandler(async (req, res) => {
  const Course = await getCourse();

  const { courseId } = req.params;

  const isCourseExists = await Course.findById(courseId);

  if (!isCourseExists) {
    throw new ApiError(404, "course not found");
  }

  const deleteRegisteredCourse = await Course.findByIdAndDelete(
    isCourseExists._id
  );

  if (!deleteRegisteredCourse) {
    throw new ApiError(500, "failed to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "course deleted successfully"));
});

const getCourses = asyncHandler(async (req, res) => {
  const Course = await getCourse();

  const courses = await Course.find();

  if (!courses) {
    throw new ApiError(404, "No course is registered");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "course fetched successfully"));
});

export { createCourse, updateCourse, deleteCourse, getCourses };
