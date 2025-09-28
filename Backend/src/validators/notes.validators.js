import { body } from "express-validator";

const uploadUpdateNoteValidator = () => {
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
      .withMessage("Subject name must be between 3 and 50 characters")
      .escape(),
    body("owner")
      .trim()
      .notEmpty()
      .withMessage("owner is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Owner name must be between 3 and 50 characters")
      .escape(),
  ];
};

const notesSubjectValidator = () => {
  return [
    body("subject")
      .trim()
      .notEmpty()
      .withMessage("subject is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("subject name must be between 3 and 50 characters")
      .escape(),
  ];
};

export { uploadUpdateNoteValidator, notesSubjectValidator };
