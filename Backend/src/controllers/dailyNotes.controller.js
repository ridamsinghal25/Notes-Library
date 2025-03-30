import { Course } from "../models/course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  deleteMultipleAssestsFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { DailyNotes } from "../models/dailyNotes.model.js";
import { MAX_DAILY_NOTES } from "../constants.js";
import { User } from "../models/user.model.js";

const createDailyNotes = asyncHandler(async (req, res) => {
  const { chapterNumber, chapterName, subject } = req.body;

  if (!req.files || !req.files.length) {
    throw new ApiError(400, "At least one file is required");
  }

  const course = await Course.findOne({
    _id: req.user?.course,
    subjects: {
      $elemMatch: {
        subjectName: subject,
        chapters: { $in: [chapterName] },
      },
    },
  });

  if (!course) {
    throw new ApiError(404, "This course does not exists");
  }

  const promisesOfUploadFiles = req.files?.map((file) =>
    uploadOnCloudinary(file?.path)
  );
  const uploadFiles = await Promise.all(promisesOfUploadFiles);

  if (!uploadFiles || uploadFiles?.length === 0) {
    throw new ApiError(500, "Failed to upload files");
  }

  const notes = uploadFiles.map((file) => ({
    public_id: file.public_id,
    url: file.secure_url,
    name: file.original_filename,
    size: file.bytes,
  }));

  const dailyNotes = await DailyNotes.create({
    chapterName,
    chapterNumber,
    subject,
    notes,
    course: course?._id,
    createdBy: req.user?._id,
  });

  if (!dailyNotes) {
    throw new ApiError(500, "Failed to create notes");
  }

  const dailyNotesWithCreatedByDetails = {
    ...dailyNotes.toObject(),
    createdBy: {
      fullName: req.user?.fullName,
      rollNumber: req.user?.rollNumber,
    },
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        dailyNotesWithCreatedByDetails,
        "notes uploaded successfully"
      )
    );
});

const updateDailyNotes = asyncHandler(async (req, res) => {
  const { chapterNumber, chapterName, subject } = req.body;
  const { dailyNotesId } = req.params;

  const course = await Course.findOne({
    _id: req.user?.course,
    subjects: {
      $elemMatch: {
        subjectName: subject,
        chapters: { $in: [chapterName] },
      },
    },
  });

  if (!course) {
    throw new ApiError(404, "Invalid subject or chapter for this course");
  }

  const dailyNotes = await DailyNotes.findOneAndUpdate(
    {
      _id: dailyNotesId,
      course: req.user?.course,
    },
    {
      $set: {
        chapterName,
        chapterNumber,
        subject,
        updatedBy: req.user?._id,
      },
    },
    { new: true }
  );

  if (!dailyNotes) {
    throw new ApiError(404, "notes does not exists");
  }

  const newDailyNotesWithUpdatedByDetails = {
    ...dailyNotes.toObject(),
    updatedBy: {
      fullName: req.user?.fullName,
      rollNumber: req.user?.rollNumber,
    },
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newDailyNotesWithUpdatedByDetails,
        "notes updated successfully"
      )
    );
});

const updateFilesOfDailyNotes = asyncHandler(async (req, res) => {
  const { dailyNotesId } = req.params;

  const { subject } = req.body;

  if (!req.files || !req.files.length) {
    throw new ApiError(400, "At least one file is required");
  }

  const course = await Course.findOne({
    _id: req.user?.course,
    subjects: {
      $elemMatch: {
        subjectName: subject,
      },
    },
  });

  if (!course) {
    throw new ApiError(404, "This course does not exists");
  }

  const dailyNotes = await DailyNotes.findOne({
    _id: dailyNotesId,
    course: req.user?.course,
  });

  if (!dailyNotes) {
    throw new ApiError(404, "notes does not exists");
  }

  if (dailyNotes.notes?.length >= MAX_DAILY_NOTES) {
    throw new ApiError(400, "You cannot upload more than 10 files");
  }

  const newDailyNotesLength = dailyNotes.notes?.length + req.files?.length;

  if (newDailyNotesLength > MAX_DAILY_NOTES) {
    throw new ApiError(
      400,
      `You cannot upload more than 10 files. You can upload ${MAX_DAILY_NOTES - dailyNotes.notes?.length} more files`
    );
  }

  const promisesOfUploadFiles = req.files?.map((file) =>
    uploadOnCloudinary(file?.path)
  );

  const uploadFiles = await Promise.all(promisesOfUploadFiles);

  if (!uploadFiles || uploadFiles?.length === 0) {
    throw new ApiError(500, "Failed to upload files");
  }

  const notes = uploadFiles.map((file) => ({
    public_id: file.public_id,
    url: file.secure_url,
    name: file.original_filename,
    size: file.bytes,
  }));

  dailyNotes.notes = [...dailyNotes.notes, ...notes];
  dailyNotes.updatedBy = req.user?._id;

  const newDailyNotes = await dailyNotes.save();

  if (!newDailyNotes) {
    throw new ApiError(500, "Failed to update notes");
  }

  const newDailyNotesWithUpdatedByDetails = {
    ...newDailyNotes.toObject(),
    updatedBy: {
      fullName: req.user?.fullName,
      rollNumber: req.user?.rollNumber,
    },
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newDailyNotesWithUpdatedByDetails,
        "notes uploaded successfully"
      )
    );
});

const deleteChapterAllDailyNotes = asyncHandler(async (req, res) => {
  const { chapterName, subject } = req.body;

  const dailyNotes = await DailyNotes.find({
    chapterName,
    subject,
  }).lean();

  if (!dailyNotes || !dailyNotes.length) {
    throw new ApiError(400, "No notes found");
  }

  const notesCourse = [
    ...new Set(dailyNotes.map((note) => note.course.toString())),
  ];

  if (!notesCourse.length) {
    throw new ApiError(400, "You are not allowed to delete these notes");
  }

  if (notesCourse[0] !== req.user?.course.toString()) {
    throw new ApiError(400, "You are not allowed to delete these notes");
  }

  const dailyNotesPublicIdsOfCloudinary = dailyNotes
    .map((dailyNote) => dailyNote.notes?.map((note) => note.public_id))
    ?.flat(1);

  const deletedDailyNotesFiles = await deleteMultipleAssestsFromCloudinary(
    dailyNotesPublicIdsOfCloudinary
  );

  const deletedDailyNotesPublicIds = Object.keys(
    deletedDailyNotesFiles.deleted
  );

  const fileNotDeletedIds = dailyNotesPublicIdsOfCloudinary.filter(
    (id) => !deletedDailyNotesPublicIds.includes(id)
  );

  if (fileNotDeletedIds.length) {
    throw new ApiError(500, "Internal server error. Please try again");
  }

  const notesDeleteResponse = await DailyNotes.deleteMany({
    chapterName,
    subject,
  });

  if (!notesDeleteResponse.deletedCount) {
    throw new ApiError(500, "Failed to delete notes");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "chapter deleted successfully"));
});

const deleteDailyNotes = asyncHandler(async (req, res) => {
  const { dailyNotesId } = req.params;

  const dailyNotes = await DailyNotes.findOne({
    _id: dailyNotesId,
    course: req.user?.course,
  });

  if (!dailyNotes) {
    throw new ApiError(404, "notes does not exists");
  }

  const dailyNotesPublicIdsOfCloudinary = dailyNotes?.notes?.map(
    (note) => note.public_id
  );

  if (dailyNotesPublicIdsOfCloudinary?.length) {
    const deletedDailyNotesFiles = await deleteMultipleAssestsFromCloudinary(
      dailyNotesPublicIdsOfCloudinary
    );
    const deletedDailyNotesPublicIds = Object.keys(
      deletedDailyNotesFiles.deleted
    );

    const fileNotDeletedIds = dailyNotesPublicIdsOfCloudinary.filter(
      (id) => !deletedDailyNotesPublicIds.includes(id)
    );

    if (fileNotDeletedIds.length) {
      throw new ApiError(500, "Internal server error. Please try again");
    }
  }

  const notesDeleteResponse = await dailyNotes.deleteOne();

  if (!notesDeleteResponse.deletedCount) {
    throw new ApiError(500, "Failed to delete notes");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "notes deleted successfully"));
});

const getDailyNotes = asyncHandler(async (req, res) => {
  const { chapterName, subject } = req.query;

  const dailyNotes = await DailyNotes.find({
    chapterName,
    subject,
  })
    .sort({ createdAt: -1 })
    .lean();

  if (!dailyNotes || !dailyNotes.length) {
    throw new ApiError(200, "No notes found");
  }

  const ownerIds = [
    ...new Set(
      dailyNotes.map((notes) => [notes.createdBy, notes?.updatedBy])?.flat(1)
    ),
  ];

  const users = await User.find({ _id: { $in: ownerIds } })
    .select("fullName rollNumber")
    .lean();

  const userMap = users.reduce((map, user) => {
    map[user._id] = user;
    return map;
  }, {});

  const dailyNotesWithOwners = dailyNotes.map((notes) => ({
    ...notes,
    createdBy: userMap[notes.createdBy] || null,
    updatedBy: userMap[notes.updatedBy] || null,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(200, dailyNotesWithOwners, "notes fetched successfully")
    );
});

const deleteFilesOfDailyNotes = asyncHandler(async (req, res) => {
  const { dailyNotesId } = req.params;

  const { publicIds } = req.body;

  const dailyNotes = await DailyNotes.findOne({
    _id: dailyNotesId,
    course: req.user?.course,
  });

  if (!dailyNotes) {
    throw new ApiError(404, "notes does not exists");
  }

  const dailyNotesPublicIdsOfCloudinary = dailyNotes?.notes?.map(
    (note) => note.public_id
  );

  const isAllFilesExistsInDB = publicIds?.every((id) =>
    dailyNotesPublicIdsOfCloudinary.includes(id)
  );

  if (!isAllFilesExistsInDB) {
    throw new ApiError(400, "Some of the files does not exists");
  }

  const deletedDailyNotesFiles =
    await deleteMultipleAssestsFromCloudinary(publicIds);

  const deletedDailyNotesPublicIds = Object.keys(
    deletedDailyNotesFiles.deleted
  );

  const fileNotDeletedIds = publicIds.filter(
    (id) => !deletedDailyNotesPublicIds.includes(id)
  );

  if (fileNotDeletedIds.length) {
    throw new ApiError(500, "Internal server error. Please try again");
  }

  const updatedNotesFiles = dailyNotes?.notes?.filter(
    (note) => !publicIds.includes(note?.public_id)
  );

  dailyNotes.notes = updatedNotesFiles;
  dailyNotes.updatedBy = req.user?._id;

  const updatedDailyNotes = await dailyNotes.save();

  if (!updatedDailyNotes) {
    throw new ApiError(500, "Failed to update notes");
  }

  const newDailyNotesWithUpdatedByDetails = {
    ...updatedDailyNotes.toObject(),
    updatedBy: {
      fullName: req.user?.fullName,
      rollNumber: req.user?.rollNumber,
    },
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newDailyNotesWithUpdatedByDetails,
        "notes updated successfully"
      )
    );
});

export {
  createDailyNotes,
  updateDailyNotes,
  updateFilesOfDailyNotes,
  deleteChapterAllDailyNotes,
  deleteFilesOfDailyNotes,
  deleteDailyNotes,
  getDailyNotes,
};
