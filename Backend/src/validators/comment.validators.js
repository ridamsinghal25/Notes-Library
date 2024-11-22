import { body } from "express-validator";

const commentContentValidator = () => {
  return [body("content").trim().notEmpty().withMessage("content is required")];
};

export { commentContentValidator };
