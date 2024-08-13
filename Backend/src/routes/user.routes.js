import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware.js";
import {
  userAssignRoleValidator,
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResendEmailValidator,
  userResetForgottenPasswordValidator,
  userUpdateCourseValidator,
  userVerifyEmailValidator,
} from "../validators/user.validators.js";
import { validate } from "../validators/validate.js";
import {
  assignRole,
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendVerificationEmail,
  resetForgottenPassword,
  updateCourseByUser,
  verifyEmail,
} from "../controllers/user.controller.js";
import { UserRolesEnum } from "../constants.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);

router.route("/login").post(userLoginValidator(), validate, loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router
  .route("/verify-email")
  .post(userVerifyEmailValidator(), validate, verifyEmail);

router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);

router
  .route("/reset-password")
  .post(
    userResetForgottenPasswordValidator(),
    validate,
    resetForgottenPassword
  );

router
  .route("/resend-email")
  .get(userResendEmailValidator(), validate, resendVerificationEmail);

router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword
  );

router.route("/current-user").get(verifyJWT, getCurrentUser);

router
  .route("/assign-role")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN]),
    userAssignRoleValidator(),
    validate,
    assignRole
  );

router
  .route("/update-course")
  .post(verifyJWT, userUpdateCourseValidator(), validate, updateCourseByUser);

export default router;
