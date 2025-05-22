import { z } from "zod";

const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB in bytes

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const ALLOWED_AVATAR_TYPES = ["image/png", "image/jpg", "image/jpeg"];

const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const signupFormValidation = z.object({
  fullName: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "Full name must contain only alphabets and , . _ - characters"
    )
    .min(6, "Full name must be atleast 6 characters")
    .max(40, "Full name must not be more than 40 characters"),
  email: z.string().trim().email("Invalid email address"),
  rollNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{11}$/, "Roll number can only contain digits and numbers")
    .length(11, "Roll number must be exactly 11 digits"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be atleast 8 characters")
    .max(40, "Password must not be more than 40 characters"),
  courseName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\s.-]+$/, "course must contain only alphabets")
    .min(1, "Course is required"),
  semester: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\s]+$/, "semester must contain only alphabets")
    .min(1, "Semester is required")
    .max(40, "Semester must not be more than 40 characters"),
});

export const signinFormValidation = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be atleast 8 characters")
    .max(40, "Password must not be more than 40 characters"),
});

export const inputOTPValidation = z.object({
  verifyCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Verification code must contain only digits")
    .length(6, "verification code must be 6 digit"),
});

const pdfFileSchema = z
  .instanceof(File, { message: "PDF document is required" })
  .refine((file) => file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  })
  .refine((file) => file.size <= MAX_PDF_SIZE, {
    message: "File size must not exceed 10MB",
  });

export const pdfFileValidation = z.object({
  pdfFile: pdfFileSchema,
});

export const uploadNotesValidation = z.object({
  subject: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "subjects must contain only alphabets and , . _ - characters"
    )
    .min(1, "Subject is required")
    .max(40, "Subject must not be more than 40 characters"),
  chapterNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, "Chapter number must contain only digits")
    .max(2, "Chapter number must not be more than 2 digits"),
  chapterName: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "chapter name must contain only alphabets and , . _ - characters"
    )
    .min(1, "Chapter name is required")
    .max(40, "Chapter name must not be more than 40 characters"),
  pdfFile: pdfFileSchema,
  owner: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "owner name must contain only alphabets and , . _ - characters"
    )
    .min(1, "owner name is required")
    .max(40, "owner name must not be more than 40 characters"),
});

export const updateNotesValidation = z.object({
  subject: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "subjects must contain only alphabets and , . _ - characters"
    )
    .min(1, "Subject is required")
    .max(40, "Subject must not be more than 40 characters"),
  chapterNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, "Chapter number must contain only digits")
    .max(2, "Chapter number must not be more than 2 digits"),
  chapterName: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "chapter name must contain only alphabets and , . _ - characters"
    )
    .min(1, "Chapter name is required")
    .max(40, "Chapter name must not be more than 40 characters"),
  owner: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "owner name must contain only alphabets and , . _ - characters"
    )
    .min(1, "owner name is required")
    .max(40, "owner name must not be more than 40 characters"),
});

export const newPasswordFormValidation = z.object({
  oldPassword: z
    .string()
    .trim()
    .min(8, "Password must be atleast 8 characters")
    .max(40, "Password must not be more than 40 characters"),
  newPassword: z
    .string()
    .trim()
    .min(8, "Password must be atleast 8 characters")
    .max(40, "Password must not be more than 40 characters"),
});

export const updateSemesterFormValidation = z.object({
  semester: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\s]+$/, "semester must contain only alphabets")
    .min(1, "Semester is required")
    .max(40, "Semester must not be more than 40 characters"),
});

export const emailModalValidation = z.object({
  email: z.string().trim().email("Invalid email address"),
});

export const resetPasswordFormValidation = z.object({
  resetCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Verification code must contain only digits")
    .length(6, "verification code must be 6 digit"),
  newPassword: z
    .string()
    .trim()
    .min(8, "Password must be atleast 8 characters")
    .max(40, "Password must not be more than 40 characters"),
});

export const avatarUploadValidation = z.object({
  avatar: z
    .instanceof(File, { message: "Avatar is required" })
    .refine((file) => ALLOWED_AVATAR_TYPES.includes(file.type), {
      message: "Only .jpg, .png, or .jpeg files are allowed.",
    })
    .refine((file) => file.size <= MAX_AVATAR_SIZE, {
      message: "File size must be less than 5MB.",
    }),
});

export const courseFormValidation = z.object({
  courseName: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "course name must contain only alphabets and , . _ - characters"
    )
    .min(1, "Course name is required")
    .max(40, "Course name must not be more than 40 characters"),
  semester: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\s]+$/, "semester must contain only alphabets")
    .min(1, "Semester is required")
    .max(40, "Semester must not be more than 40 characters"),
  subjects: z
    .array(
      z.object({
        subjectName: z
          .string()
          .trim()
          .regex(
            /^[a-zA-Z\s.,_-]+$/,
            "semester must contain only alphabets and , . _ - characters"
          )
          .min(1, "subject name is required")
          .max(40, "subject name must not be more than 40 characters"),
        chapters: z
          .array(
            z
              .string()
              .trim()
              .regex(
                /^[a-zA-Z\s.,_-]+$/,
                "semester must contain only alphabets and , . _ - characters"
              )
              .min(1, "Chapter name must be a non-empty string")
              .max(40, "Chapter name must not be more than 40 characters")
          )
          .min(1, "At least one chapter is required"),
      })
    )
    .min(1, "At least one subject is required"),
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: z.string().trim().min(1, "End date is required"),
});

export const commentFormValidation = z.object({
  comment: z
    .string()
    .trim()
    .min(1, "Comment is required")
    .max(200, "Comment must not be more than 200 characters"),
});

export const editCommentFormValidation = z.object({
  newEditedComment: z
    .string()
    .trim()
    .min(1, "Comment is required")
    .max(200, "Comment must not be more than 200 characters"),
});

export const deleteSubjectNotesFormValidation = z.object({
  subject: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "subjects must contain only alphabets and , . _ - characters"
    )
    .min(1, "Subject is required")
    .max(40, "Subject must not be more than 40 characters"),
});

export const deleteCourseFormValidation = z.object({
  password: z
    .string()
    .trim()
    .min(8, "Password must be atleast 8 characters")
    .max(40, "Password must not be more than 40 characters"),
});

export const dailyNotesFormValidation = z.object({
  subject: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "subjects must contain only alphabets and , . _ - characters"
    )
    .min(1, "Subject is required")
    .max(40, "Subject must not be more than 40 characters"),
  chapterNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, "Chapter number must contain only digits")
    .max(2, "Chapter number must not be more than 2 digits"),
  chapterName: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "chapter name must contain only alphabets and , . _ - characters"
    )
    .min(1, "Chapter name is required")
    .max(40, "Chapter name must not be more than 40 characters"),
  files: z
    .array(z.instanceof(File))
    .min(1, "At least one file is required")
    .max(5, "Only 5 files are allowed")
    .refine((files) => files.every((file) => file.size <= MAX_IMAGE_SIZE), {
      message: "File size must not exceed 5MB",
    }),
});

export const updateDailyNotesFormValidation = z.object({
  subject: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "subjects must contain only alphabets and , . _ - characters"
    )
    .min(1, "Subject is required")
    .max(40, "Subject must not be more than 40 characters"),
  chapterNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, "Chapter number must contain only digits")
    .max(2, "Chapter number must not be more than 2 digits"),
  chapterName: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "chapter name must contain only alphabets and , . _ - characters"
    )
    .min(1, "Chapter name is required")
    .max(40, "Chapter name must not be more than 40 characters"),
});

export const updateFilesDailyNotesFormValidation = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, "At least one file is required")
    .max(5, "Only 5 files are allowed")
    .refine((files) => files.every((file) => file.size <= MAX_IMAGE_SIZE), {
      message: "File size must not exceed 5MB",
    }),
});

export const deleteChapterNotesFormValidation = z.object({
  subject: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "subjects must contain only alphabets and , . _ - characters"
    )
    .min(1, "Subject is required")
    .max(40, "Subject must not be more than 40 characters"),
  chapterName: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z\s.,_-]+$/,
      "chapter name must contain only alphabets and , . _ - characters"
    )
    .min(1, "Chapter name is required")
    .max(40, "Chapter name must not be more than 40 characters"),
});
