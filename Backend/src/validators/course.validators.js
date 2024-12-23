import { body } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const createCourseValidator = () => {
  return [
    body("courseName").trim().notEmpty().withMessage("course name is required"),
    body("semester")
      .trim()
      .notEmpty()
      .withMessage("course semester is required"),
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
      .withMessage("Invalid end date. Date must be in ISO8601 format"),
    body("subjects")
      .isArray()
      .withMessage("Subjects must be an array")
      .custom((subjects) => {
        if (subjects.length === 0) {
          throw new Error("Subjects cannot be an empty array");
        }
        subjects.forEach((subject) => {
          if (typeof subject !== "string") {
            throw new ApiError(400, "Each subject must be a string");
          }
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
      .withMessage("new course name is required"),
    body("semester")
      .trim()
      .notEmpty()
      .withMessage("new course semester is required"),
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
          if (typeof subject !== "string") {
            throw new ApiError(400, "Each subject must be a string");
          }
        });
        return true;
      }),
  ];
};

export { createCourseValidator, updateCourseValidator };
