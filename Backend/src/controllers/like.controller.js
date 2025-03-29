import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notes } from "../models/notes.model.js";
import { Like } from "../models/like.model.js";

const toggleNotesLike = asyncHandler(async (req, res) => {
  const { notesId } = req.params;

  const notes = await Notes.findById(notesId);

  if (!notes) {
    throw new ApiError(404, "notes does not exists");
  }

  const isAlreadyLiked = await Like.findOne({
    notesId,
    likedBy: req.user?._id,
  });

  if (!isAlreadyLiked) {
    const like = await Like.create({
      notesId,
      likedBy: req.user?._id,
    });

    if (!like) {
      throw new ApiError(500, "Internal server error. Please try again");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: true }, "Liked successfully"));
  } else {
    const unlike = await Like.findOneAndDelete({
      notesId,
      likedBy: req.user?._id,
    });

    if (!unlike) {
      throw new ApiError(500, "Internal server error. Please try again");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: false }, "Unliked successfully"));
  }
});

export { toggleNotesLike };
