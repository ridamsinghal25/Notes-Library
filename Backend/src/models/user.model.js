import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  AvailableUserRoles,
  UserRolesEnum,
  USER_TEMPORARY_TOKEN_EXPIRY,
} from "../constants.js ";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
      lowercase: true,
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, "roll number is required"],
      unique: [true, "roll number must be unique"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    fullName: {
      type: String,
      required: [true, "fullname is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      rollNumber: this.rollNumber,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateTemporaryOTPToken = function () {
  // Generate a 6-digit OTP
  const min = 100000;
  const max = 999999;
  const unHashedOTP = crypto.randomInt(min, max + 1).toString();

  // Hash the OTP for storage
  const hashedOTP = crypto
    .createHash("sha256")
    .update(unHashedOTP)
    .digest("hex");

  // Set the expiry time for the OTP (20 minutes)
  const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

  return { unHashedOTP, hashedOTP, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
