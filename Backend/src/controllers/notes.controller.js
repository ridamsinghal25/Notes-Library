import { Notes } from "../models/notes.model.js";
import { Course } from "../models/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const uploadNotes = asyncHandler(async (req, res) => {
  const { chapterNumber, chapterName, subject, owner } = req.body;

  const pdfFileLocalPath = req?.file?.path;

  if (!pdfFileLocalPath) {
    throw new ApiError(400, "PDF file is required");
  }

  const course = await Course.findById(req.user?.course);

  if (!course) {
    throw new ApiError(404, "course does not exists");
  }

  if (!course.subjects.includes(subject)) {
    throw new ApiError(400, "Your course does not have this subject");
  }

  const pdfFile = await uploadOnCloudinary(pdfFileLocalPath);

  if (!pdfFile) {
    throw new ApiError(500, "Failed to upload pdf file");
  }

  const notes = await Notes.create({
    chapterName,
    chapterNumber,
    subject,
    pdf: {
      public_id: pdfFile.public_id,
      url: pdfFile.url, // secure_url
    },
    owner,
    course: req.user.course,
  });

  if (!notes) {
    throw new ApiError(500, "Failed to upload notes");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "notes uploaded successfully"));
});

const updateNotes = asyncHandler(async (req, res) => {
  const { notesId } = req.params;
  const { chapterNumber, chapterName, subject, owner } = req.body;

  const pdfFileLocalPath = req?.file?.path;

  if (!pdfFileLocalPath) {
    throw new ApiError(400, "PDF file is required");
  }

  const course = await Course.findById(req.user?.course);

  if (!course) {
    throw new ApiError(404, "course does not exists");
  }

  if (!course.subjects.includes(subject)) {
    throw new ApiError(400, "Your course does not have this subject");
  }

  const notes = await Notes.findById(notesId);

  if (!notes) {
    throw new ApiError(404, "notes not found");
  }

  const deleteOldNotesPdf = await deleteFromCloudinary(notes?.pdf?.public_id);

  if (!deleteOldNotesPdf || deleteOldNotesPdf.result === "not found") {
    throw new ApiError(500, "Internal server error");
  }

  const uploadNewPdfFile = await uploadOnCloudinary(pdfFileLocalPath);

  if (!uploadNewPdfFile) {
    throw new ApiError(500, "Failed to upload pdf file");
  }

  const newNotes = await Notes.findByIdAndUpdate(
    notesId,
    {
      $set: {
        chapterName,
        chapterNumber,
        subject,
        pdf: {
          public_id: uploadNewPdfFile.public_id,
          url: uploadNewPdfFile.url, // secure_url
        },
        owner,
        course: req?.user?.course,
      },
    },
    { new: true }
  );

  if (!newNotes) {
    throw new ApiError(500, "Failed to update notes");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newNotes, "notes updated successfully"));
});

const deleteNotes = asyncHandler(async (req, res) => {
  const { notesId } = req.params;

  const notesExists = await Notes.findById(notesId);

  if (!notesExists) {
    throw new ApiError(404, "notes not found");
  }

  const deleteNotesPdf = await deleteFromCloudinary(notesExists?.pdf.public_id);

  if (!deleteNotesPdf || deleteNotesPdf.result === "not found") {
    throw new ApiError(500, "Failed to delete notes PDF");
  }

  const deleteNotes = await Notes.findByIdAndDelete(notesId);

  if (!deleteNotes) {
    throw new ApiError(500, "Failed to delete notes");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "notes deleted successfully"));
});

const getNotesBySubject = asyncHandler(async (req, res) => {
  const { subject } = req.body;

  const notes = await Notes.aggregate([
    {
      $match: {
        subject,
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
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "notesId",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes",
        },
        isLiked: {
          $cond: {
            if: {
              $in: [req.user?._id, "$likes.likedBy"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $unwind: "$course",
    },
    {
      $project: {
        "course.endDate": 0,
        "course.startDate": 0,
        likes: 0,
      },
    },
  ]);

  if (!notes) {
    throw new ApiError(404, "notes not found");
  }

  if (notes.length === 0) {
    return res
      .status(404)
      .json(
        new ApiResponse(
          404,
          {},
          "Notes does not exists with the following subject"
        )
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "notes fetched successfully"));
});

export { uploadNotes, updateNotes, deleteNotes, getNotesBySubject };
