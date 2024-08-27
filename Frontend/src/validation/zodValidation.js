import { z } from "zod";

export const signupFormValidation = z.object({
  fullName: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, "Full name must contain only alphabets and spaces")
    .min(6, "Full name must be atleast 6 characters")
    .max(20, "Full name must not be more than 20 characters"),
  email: z.string().email("Invalid email address"),
  rollNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{11}$/, "Roll number can only contain digits and numbers")
    .length(11, "Roll number must be exactly 11 digits"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(40, "Password must not be more than 40 characters"),
  courseName: z
    .string()
    .regex(/^[a-zA-Z\s.-]+$/, "course must contain only alphabets and spaces")
    .min(1, "Course is required"),
  semester: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, "semester must contain only alphabets and spaces")
    .min(1, "Semester is required")
    .max(20, "Semester must not be more than 20 characters"),
});

export const signinFormValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(40, "Password must not be more than 40 characters"),
});

export const inputOTPValidation = z.object({
  code: z
    .string()
    .regex(/^\d{6}$/, "Verification code must contain only digits")
    .length(6, "verification code must be 6 digit"),
});

export const uploadNotesValidation = z.object({
  subject: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, "subjects must contain only alphabets and spaces")
    .min(1, "Subject is required")
    .max(20, "Subject must not be more than 20 characters"),
  chapterNumber: z
    .string()
    .regex(/^\d+$/, "Chapter number must contain only digits")
    .max(2, "Chapter number must not be more than 2 digits"),
  chapterName: z
    .string()
    .regex(
      /^[a-zA-Z\s]+$/,
      "chapter name must contain only alphabets and spaces"
    )
    .min(1, "Chapter name is required")
    .max(20, "Chapter name must not be more than 20 characters"),
  notes: z
    .string()
    .max(100, "Notes cannot must not be more than 100 characters"),
});

export const newPasswordFormValidation = z.object({
  currentPassword: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(40, "Password must not be more than 40 characters"),
  newPassword: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(40, "Password must not be more than 40 characters"),
});

export const updateSemesterFormValidation = z.object({
  semester: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, "semester must contain only alphabets and spaces")
    .min(1, "Semester is required")
    .max(20, "Semester must not be more than 20 characters"),
});
