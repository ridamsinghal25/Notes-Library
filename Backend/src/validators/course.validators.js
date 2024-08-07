import { body } from "express-validator";

const courseValidator = () => {
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
  ];
};

const deleteCourseValidator = () => {
  return [
    body("courseName").trim().notEmpty().withMessage("course name is required"),
    body("semester")
      .trim()
      .notEmpty()
      .withMessage("course semester is required"),
  ];
};

const getCourseByNameValidator = () => {
  return [
    body("courseName").trim().notEmpty().withMessage("course name is required"),
  ];
};

export { courseValidator, deleteCourseValidator, getCourseByNameValidator };
