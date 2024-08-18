import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import fs from "fs";

export const validate = (req, _, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  // 422: Unprocessable Entity
  throw new ApiError(422, "Received data is not valid", extractedErrors);
};
