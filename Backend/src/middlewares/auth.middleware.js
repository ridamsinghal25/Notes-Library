import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(404, "Invalid token");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select(
      "-password -emailVerificationToken -emailVerificationExpiry -refreshToken -forgotPasswordToken -forgotPasswordExpiry"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access token");
    }

    if (!user.isEmailVerified) {
      throw new ApiError(403, "Please verify your email");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(
      error?.statusCode || 401,
      error?.message || "Invalid access token"
    );
  }
});

export const verifyPermission = (roles = []) =>
  asyncHandler(async (req, _, next) => {
    if (!req.user?._id) {
      throw new ApiError(401, "Unauthorized request");
    }
    if (roles.includes(req.user?.role)) {
      next();
    } else {
      throw new ApiError(403, "You are not allowed to perform this action");
    }
  });
