import { body } from "express-validator";

const commentContentValidator = () => {
  return [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("content is required")
      .isLength({ min: 1, max: 200 })
      .withMessage("content must be between 1 and 200 characters")
      .escape(),
  ];
};

export { commentContentValidator };
