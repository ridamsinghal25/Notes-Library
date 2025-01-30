import { body } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const createCourseValidator = () => {
  return [
    body("courseName")
      .trim()
      .notEmpty()
      .withMessage("course name is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("course name must be between 3 and 50 characters")
      .escape(),
    body("semester")
      .trim()
      .notEmpty()
      .withMessage("course semester is required")
      .escape(),
    body("startDate")
      .trim()
      .notEmpty()
      .withMessage("Start date is required")
      .isISO8601()
      .withMessage("Invalid start date. Date must be in ISO8601 format"),
    body("endDate")
      .trim()
      .notEmpty()
      .withMessage("Expiry date is required")
      .isISO8601()
      .withMessage("Invalid end date. Date must be in ISO8601 format")
      .custom((value, { req }) => {
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(value);
        if (startDate >= endDate) {
          throw new ApiError(400, "End date must be after start date");
        }
        return true;
      }),
    body("subjects")
      .isArray()
      .withMessage("Subjects must be an array")
      .custom((subjects) => {
        if (subjects.length === 0) {
          throw new Error("Subjects cannot be an empty array");
        }
        subjects.forEach((subject) => {
          if (typeof subject.subjectName !== "string") {
            throw new ApiError(400, "Each subject must be a string");
          } else if (subject.chapters.length === 0) {
            throw new Error("Each subject must have at least one chapter");
          }
          subject.chapters.forEach((chapter) => {
            if (typeof chapter !== "string") {
              throw new ApiError(400, "Each chapter must be a string");
            }
          });
        });
        return true;
      }),
  ];
};

const updateCourseValidator = () => {
  return [
    body("courseName")
      .trim()
      .notEmpty()
      .withMessage("course name is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("course name must be between 3 and 50 characters")
      .escape(),
    body("semester")
      .trim()
      .notEmpty()
      .withMessage("new course semester is required")
      .escape(),
    body("startDate")
      .trim()
      .notEmpty()
      .withMessage("Start date is required")
      .isISO8601()
      .withMessage("Invalid start date. Date must be in ISO8601 format"),
    body("endDate")
      .trim()
      .notEmpty()
      .withMessage("Expiry date is required")
      .isISO8601()
      .withMessage("Invalid end date. Date must be in ISO8601 format")
      .custom((value, { req }) => {
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(value);
        if (startDate >= endDate) {
          throw new ApiError(400, "End date must be after start date");
        }
        return true;
      }),
    body("subjects")
      .isArray()
      .withMessage("Subjects must be an array")
      .custom((subjects) => {
        if (subjects.length === 0) {
          throw new Error("Subjects cannot be an empty array");
        }
        subjects.forEach((subject) => {
          if (typeof subject.subjectName !== "string") {
            throw new ApiError(400, "Each subject must be a string");
          } else if (subject.chapters.length === 0) {
            throw new Error("Each subject must have at least one chapter");
          }
          subject.chapters.forEach((chapter) => {
            if (typeof chapter !== "string") {
              throw new ApiError(400, "Each chapter must be a string");
            }
          });
        });
        return true;
      }),
  ];
};

export { createCourseValidator, updateCourseValidator };
