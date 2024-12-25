import { getNotes } from "../models/notes.model.js";
import { getCourse } from "../models/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const uploadNotes = asyncHandler(async (req, res) => {
  const Course = await getCourse();
  const Notes = await getNotes();

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

  const publicId = `${subject.replace(/\s+/g, "_")}_${chapterName.replace(/\s+/g, "_")}_${Date.now()}`;

  const pdfFile = await uploadOnCloudinary(pdfFileLocalPath, publicId);

  if (!pdfFile) {
    throw new ApiError(500, "Failed to upload pdf file");
  }

  const notes = await Notes.create({
    chapterName,
    chapterNumber,
    subject,
    pdf: {
      public_id: pdfFile.public_id,
      url: pdfFile.secure_url,
    },
    owner,
    course: req.user.course,
    createdBy: req.user._id,
  });

  if (!notes) {
    throw new ApiError(500, "Failed to upload notes");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "notes uploaded successfully"));
});

const updateNotesDetails = asyncHandler(async (req, res) => {
  const Course = await getCourse();
  const Notes = await getNotes();
  const user = req?.user;

  const { notesId } = req.params;
  const { chapterNumber, chapterName, subject, owner } = req.body;

  const course = await Course.findById(req.user?.course);

  if (!course) {
    throw new ApiError(404, "Course does not exists");
  }

  if (!course.subjects.includes(subject)) {
    throw new ApiError(400, "Your course does not have this subject");
  }

  const notes = await Notes.findById(notesId);

  if (!notes) {
    throw new ApiError(404, "Notes does not exists");
  }

  if (notes.createdBy.toString() !== user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this notes");
  }

  notes.chapterName = chapterName;
  notes.chapterNumber = chapterNumber;
  notes.subject = subject;
  notes.owner = owner;

  const newNotes = await notes.save();

  if (!newNotes._id) {
    throw new ApiError(500, "Failed to update notes details");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newNotes, "notes updated successfully"));
});

const deleteNotes = await asyncHandler(async (req, res) => {
  const Notes = await getNotes();
  const user = req?.user;

  const { notesId } = req.params;

  const notesExists = await Notes.findById(notesId);

  if (!notesExists) {
    throw new ApiError(404, "notes not found");
  }

  if (notesExists.createdBy.toString() !== user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this notes");
  }

  const deleteNotesPdf = await deleteFromCloudinary(notesExists?.pdf.public_id);

  if (!deleteNotesPdf || deleteNotesPdf.result === "not found") {
    throw new ApiError(500, "Failed to delete notes PDF");
  }

  const deleteNotes = await notesExists.deleteOne();

  if (!deleteNotes.deletedCount) {
    throw new ApiError(500, "Failed to delete notes");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "notes deleted successfully"));
});

const getNotesBySubject = asyncHandler(async (req, res) => {
  const Notes = await getNotes();

  const { subject } = req.body;

  const notes = await Notes.aggregate([
    {
      $match: {
        subject,
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
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "notesId",
        as: "comments",
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes",
        },
        commentsCount: {
          $size: "$comments",
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
      $project: {
        likes: 0,
        comments: 0,
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

  let notesMap = new Map();

  notes.forEach((note) => {
    const key = `${note.chapterNumber}-${note.subject}`;

    if (!notesMap.has(key)) {
      // Create a new entry in the map
      notesMap.set(key, {
        chapterNumber: note.chapterNumber,
        subject: note.subject,
        mergedNotes: [note],
      });
    } else {
      // Update the existing entry
      const entry = notesMap.get(key);

      // Avoid duplicates in mergedNotes
      if (
        !entry.mergedNotes.some((existingNote) => existingNote._id === note._id)
      ) {
        entry.mergedNotes.push(note);
      }
    }
  });

  const newNotes = Array.from(notesMap.values());

  return res
    .status(200)
    .json(new ApiResponse(200, newNotes, "notes fetched successfully"));
});

const getNotesUploadedByUser = asyncHandler(async (req, res) => {
  const Notes = await getNotes();

  const notes = await Notes.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(`${req.user?._id}`),
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
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "notesId",
        as: "comments",
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes",
        },
        commentsCount: {
          $size: "$comments",
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
      $project: {
        likes: 0,
        comments: 0,
      },
    },
  ]);

  if (!notes) {
    throw new ApiError(404, "notes does not exists");
  }

  if (Array.isArray(notes) && notes?.length === 0) {
    return res
      .status(201)
      .json(new ApiResponse(201, [], "you have not uploaded any notes yet"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "notes fetched successfully"));
});

const updateNotesPdfFile = asyncHandler(async (req, res) => {
  const Notes = await getNotes();
  const user = req?.user;

  const { notesId } = req.params;

  const pdfFileLocalPath = req?.file?.path;

  if (!pdfFileLocalPath) {
    throw new ApiError(400, "PDF file is required");
  }

  const notes = await Notes.findById(notesId);

  if (!notes) {
    throw new ApiError(404, "notes does not exists");
  }

  if (notes.createdBy.toString() !== user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update this notes");
  }

  const deleteOldNotesPdf = await deleteFromCloudinary(notes?.pdf?.public_id);

  if (!deleteOldNotesPdf || deleteOldNotesPdf.result === "not found") {
    throw new ApiError(500, "Internal server error. Please try again");
  }

  const publicId = `${notes?.subject.replace(/\s+/g, "_")}_${notes?.chapterName.replace(/\s+/g, "_")}_${Date.now()}`;

  const uploadNewPdfFile = await uploadOnCloudinary(pdfFileLocalPath, publicId);

  if (!uploadNewPdfFile) {
    throw new ApiError(500, "Failed to upload pdf file");
  }

  notes.pdf = {
    public_id: uploadNewPdfFile.public_id,
    url: uploadNewPdfFile.secure_url,
  };

  const newNotes = await notes.save();

  if (!newNotes._id) {
    throw new ApiError(500, "Failed to update notes");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, newNotes, "notes pdf file updated successfully")
    );
});

export {
  uploadNotes,
  updateNotesDetails,
  deleteNotes,
  getNotesBySubject,
  getNotesUploadedByUser,
  updateNotesPdfFile,
};
