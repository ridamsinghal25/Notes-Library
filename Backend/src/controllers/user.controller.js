import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { USER_TEMPORARY_TOKEN_EXPIRY } from "../constants.js";
import { sendEmail } from "../utils/emails/sendEmail.js";
import {
  verificationEmailTemplate,
  verificationPlainTextTemplate,
} from "../utils/emails/verificationEmailTemplate.js";
import jwt from "jsonwebtoken";
import {
  forgotPasswordEmailTemplate,
  forgotPasswordPlainTextTemplate,
} from "../utils/emails/forgotPasswordTemplate.js";
import crypto from "crypto";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";
import { isValidRollNumber } from "../utils/rollNumbers.js";

function generateTemporaryOTPToken() {
  const min = 100000;
  const max = 999999;
  const unHashedOTP = crypto.randomInt(min, max + 1).toString();

  const hashedOTP = crypto
    .createHash("sha256")
    .update(unHashedOTP)
    .digest("hex");

  const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

  return { unHashedOTP, hashedOTP, tokenExpiry };
}

async function generateAccessAndRefreshToken(userId) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "user not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error while generating token: ", error);
    throw new ApiError(500, "Somthing went wrong while generating token");
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { email, rollNumber, fullName, password, semester, courseName } =
    req.body;

  const isRollNumberExist = isValidRollNumber(rollNumber);

  if (!isRollNumberExist) {
    throw new ApiError(404, "Roll number does not exists");
  }

  const isCourseExists = await Course.findOne({
    semester,
    courseName,
  });

  if (!isCourseExists) {
    throw new ApiError(
      404,
      `Sorry, we currently do not support ${courseName} course and ${semester} semester`
    );
  }

  const userExistsByRollNumber = await User.findOne({
    rollNumber,
    isEmailVerified: true,
  });

  if (userExistsByRollNumber) {
    throw new ApiError(400, "user already exists with roll number");
  }

  const userExists = await User.findOne({
    email,
  });

  const { unHashedOTP, hashedOTP, tokenExpiry } = generateTemporaryOTPToken();

  if (userExists) {
    if (userExists.isEmailVerified) {
      throw new ApiError(400, {}, "user already exists");
    } else {
      userExists.password = password;
      userExists.fullName = fullName;
      userExists.emailVerificationToken = hashedOTP;
      userExists.emailVerificationExpiry = tokenExpiry;
      userExists.course = isCourseExists._id;

      await userExists.save();
    }
  } else {
    const newUser = await User.create({
      fullName,
      email,
      password,
      rollNumber, // role
      course: isCourseExists?._id,
      isEmailVerified: false,
      emailVerificationToken: hashedOTP,
      emailVerificationExpiry: tokenExpiry,
    });

    if (!newUser) {
      throw new ApiError(500, "Something went wrong while registering user");
    }
  }

  // send verification email

  const emailMessage = await sendEmail({
    email,
    subject: "Verification Email",
    htmlContent: verificationEmailTemplate(fullName, unHashedOTP),
    textContent: verificationPlainTextTemplate(fullName, unHashedOTP),
  });

  if (!emailMessage.success) {
    throw new ApiError(
      500,
      "Something went wrong while sending verification email."
    );
  }

  const registeredUser = await User.findOne({ email }).select(
    "-password -emailVerificationToken -emailVerificationExpiry -refreshToken"
  );

  if (!registeredUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering user. Please signup again"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, registeredUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  const loggedInUser = await User.findById(user._id).select(
    "-password -emailVerificationToken -emailVerificationExpiry -refreshToken"
  );

  if (!loggedInUser) {
    throw new ApiError(404, "user not found");
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "user login successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logout successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Refresh token is expired or already used");
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "Access token refreshed"
      )
    );
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { verifyCode } = req.body;

  const hashedOTP = crypto
    .createHash("sha256")
    .update(verifyCode)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedOTP,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(404, "code is invalid or expired");
  }

  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;

  user.isEmailVerified = true;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isEmailVerified: true },
        "user email verified successfully"
      )
    );
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const { hashedOTP, unHashedOTP, tokenExpiry } = generateTemporaryOTPToken();

  user.forgotPasswordToken = hashedOTP;
  user.forgotPasswordExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  const forgotEmail = await sendEmail({
    email,
    subject: "Password reset request",
    htmlContent: forgotPasswordEmailTemplate(user?.fullName, unHashedOTP),
    textContent: forgotPasswordPlainTextTemplate(user?.email, unHashedOTP),
  });

  if (!forgotEmail.success) {
    throw new ApiError(
      500,
      "Something went wrong while sending verification email."
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset mail has been sent on your mail id"
      )
    );
});

const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { resetCode, newPassword } = req.body;

  const hashedOTP = crypto.createHash("sha256").update(resetCode).digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedOTP,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "code is invalid or expired");
  }

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  if (user.isEmailVerified) {
    throw new ApiError(409, "Email is already verified!");
  }

  const { hashedOTP, unHashedOTP, tokenExpiry } = generateTemporaryOTPToken();

  user.emailVerificationToken = hashedOTP;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  const verificationMessage = await sendEmail({
    email,
    subject: "Verification Email",
    htmlContent: verificationEmailTemplate(user?.fullName, unHashedOTP),
    textContent: verificationPlainTextTemplate(user?.fullName, unHashedOTP),
  });

  if (!verificationMessage.success) {
    throw new ApiError(
      500,
      "Something went wrong while sending verification email."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Resend verification email"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "user password updated"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(`${req.user._id}`),
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $project: {
        password: 0,
        refreshToken: 0,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, user[0], "Current user fetched successfully"));
});

const assignRole = asyncHandler(async (req, res) => {
  const { role, rollNumber } = req.body;

  const user = await User.findOne({ rollNumber });

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  user.role = role;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "user role updated successfully"));
});

const updateCourseByUser = asyncHandler(async (req, res) => {
  const { semester } = req.body;
  const courseId = req.user?.course;

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "course not found");
  }

  if (!(new Date() > new Date(course.endDate))) {
    throw new ApiError(
      400,
      `Your semester ends on ${new Date(course.endDate).toLocaleDateString()}`
    );
  }

  const newCourse = await Course.find({
    courseName: course.courseName,
    semester,
  });

  if (!newCourse) {
    throw new ApiError(404, "course not found with new semester");
  }

  if (
    !(
      new Date() > new Date(newCourse.startDate) &&
      new Date() < new Date(newCourse.endDate)
    )
  ) {
    throw new ApiError(400, "Your previous semester has not completed");
  }

  const updatedUserDetails = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        course: newCourse?._id,
      },
    },
    { new: true }
  );

  if (!updatedUserDetails) {
    throw new ApiError(500, "Failed to update course details");
  }

  return res
    .status(200)
    .json(200, updatedUserDetails, "course updated successfully");
});

const checkRollNumberExists = asyncHandler(async (req, res) => {
  const { rollNumber } = req.body;

  const isRollNumberExist = isValidRollNumber(rollNumber);

  if (!isRollNumberExist) {
    throw new ApiError(404, "Roll number does not exists");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { isRollNumberExist: true }, "Roll number is unique")
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  verifyEmail,
  forgotPasswordRequest,
  resetForgottenPassword,
  resendVerificationEmail,
  changeCurrentPassword,
  getCurrentUser,
  assignRole,
  updateCourseByUser,
  checkRollNumberExists,
};

/**
 * deleteAccount
 * updateAccount
 */
