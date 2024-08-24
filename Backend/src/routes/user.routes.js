import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware.js";
import {
  checkRollNumberExistsValidator,
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
  checkRollNumberExists,
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
import { rateLimit } from "express-rate-limit";
import { ApiError } from "../utils/ApiError.js";
import requestIp from "request-ip";

const router = Router();

router.use(requestIp.mw());

const resendEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, _) => {
    return req.clientIp;
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${
        options.limit
      } requests per ${options.windowMs / 60000} minutes`
    );
  },
});

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
  .get(
    resendEmailLimiter,
    userResendEmailValidator(),
    validate,
    resendVerificationEmail
  );

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
  .patch(verifyJWT, userUpdateCourseValidator(), validate, updateCourseByUser);

router
  .route("/verify-rollnumber")
  .post(checkRollNumberExistsValidator(), validate, checkRollNumberExists);

export default router;
