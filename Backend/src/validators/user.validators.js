import { body } from "express-validator";
import { AvailableUserRoles } from "../constants.js";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .normalizeEmail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
    body("fullName")
      .trim()
      .notEmpty()
      .withMessage("Fullname is required")
      .isLength({ min: 6, max: 50 })
      .withMessage("Fullname must be between 6 and 50 characters")
      .escape(),
    body("rollNumber")
      .trim()
      .notEmpty()
      .withMessage("Roll Number is required")
      .isLength({ min: 11, max: 11 })
      .withMessage("Roll Number must be exactly 11 characters long")
      .isNumeric()
      .withMessage("Roll Number must contain only digits")
      .escape(),
    body("courseName")
      .trim()
      .notEmpty()
      .withMessage("course name is required")
      .escape(),
    body("semester")
      .trim()
      .notEmpty()
      .withMessage("course semester is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("semester name must be between 3 and 50 characters")
      .escape(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .normalizeEmail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ];
};

const userVerifyEmailValidator = () => {
  return [
    body("verifyCode")
      .trim()
      .notEmpty()
      .withMessage("verification code is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("Verification code must be exactly 6 characters long")
      .isNumeric()
      .withMessage("verify code must be a 6 digit number"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .normalizeEmail(),
  ];
};

const userResetForgottenPasswordValidator = () => {
  return [
    body("resetCode")
      .trim()
      .notEmpty()
      .withMessage("verification code is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("Verification code must be exactly 6 characters long")
      .isNumeric()
      .withMessage("reset code must be a 6 digit number"),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ];
};

const userResendEmailValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .normalizeEmail(),
  ];
};

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("old Password is required")
      .isLength({ min: 6 })
      .withMessage("old Password must be atleast 6 characters"),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("new Password is required")
      .isLength({ min: 6 })
      .withMessage("new Password must be atleast 6 characters"),
  ];
};

const userAssignRoleValidator = () => {
  return [
    body("role")
      .trim()
      .notEmpty()
      .withMessage("role is required")
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role")
      .escape(),
    body("rollNumber")
      .trim()
      .notEmpty()
      .withMessage("Roll Number is required")
      .isLength({ min: 11, max: 11 })
      .withMessage("Roll Number must be exactly 11 characters long")
      .isNumeric()
      .withMessage("Roll Number must contain only digits")
      .escape(),
  ];
};

const userUpdateCourseSemesterValidator = () => {
  return [
    body("semester")
      .trim()
      .notEmpty()
      .withMessage("course semester is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("semester name must be between 3 and 50 characters")
      .escape(),
  ];
};

const checkRollNumberExistsValidator = () => {
  return [
    body("rollNumber")
      .trim()
      .notEmpty()
      .withMessage("Roll Number is required")
      .isLength({ min: 11, max: 11 })
      .withMessage("Roll Number must be exactly 11 characters long")
      .isNumeric()
      .withMessage("Roll Number must contain only digits")
      .escape(),
  ];
};

const verifyPasswordValidator = () => {
  return [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ];
};

export {
  userRegisterValidator,
  userLoginValidator,
  userVerifyEmailValidator,
  userForgotPasswordValidator,
  userResetForgottenPasswordValidator,
  userResendEmailValidator,
  userChangeCurrentPasswordValidator,
  userAssignRoleValidator,
  userUpdateCourseSemesterValidator,
  checkRollNumberExistsValidator,
  verifyPasswordValidator,
};
