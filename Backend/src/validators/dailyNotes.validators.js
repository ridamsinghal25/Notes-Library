import { body, query } from "express-validator";

const commonDailyNotesValidator = () => {
  return [
    body("chapterNumber")
      .trim()
      .notEmpty()
      .withMessage("chapter number is required")
      .isNumeric()
      .withMessage("chapter number must be numeric value"),
    body("chapterName")
      .trim()
      .notEmpty()
      .withMessage("chapter name is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Chapter name must be between 3 and 50 characters")
      .escape(),
    body("subject")
      .trim()
      .notEmpty()
      .withMessage("subject is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Chapter name must be between 3 and 50 characters")
      .escape(),
  ];
};

const getDailyNotesValidator = () => {
  return [
    query("chapterName")
      .trim()
      .notEmpty()
      .withMessage("chapter name is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Chapter name must be between 3 and 50 characters")
      .escape(),
    query("subject")
      .trim()
      .notEmpty()
      .withMessage("subject is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Chapter name must be between 3 and 50 characters")
      .escape(),
  ];
};

const dailyNotesChapterAndSubjectValidator = () => {
  return [
    body("chapterName")
      .trim()
      .notEmpty()
      .withMessage("chapter name is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Chapter name must be between 3 and 50 characters")
      .escape(),
    body("subject")
      .trim()
      .notEmpty()
      .withMessage("subject is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Chapter name must be between 3 and 50 characters")
      .escape(),
  ];
};

export {
  commonDailyNotesValidator,
  getDailyNotesValidator,
  dailyNotesChapterAndSubjectValidator,
};
