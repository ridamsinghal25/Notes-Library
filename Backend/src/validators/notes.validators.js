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
      .withMessage("chapter name is required"),
    body("subject").trim().notEmpty().withMessage("subject is required"),
    body("owner").trim().notEmpty().withMessage("owner is required"),
  ];
};

const getNotesBySubjectValidator = () => {
  return [body("subject").trim().notEmpty().withMessage("subject is required")];
};

export { uploadUpdateNoteValidator, getNotesBySubjectValidator };
