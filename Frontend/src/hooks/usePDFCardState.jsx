import { useState } from "react";
import { toast } from "react-toastify";
import LikeService from "@/services/LikeService";
import ApiError from "@/services/ApiError";

export const usePDFCardState = (initialNotes) => {
  const [likeState, setLikeState] = useState({
    isLiked: initialNotes.isLiked,
    count: initialNotes.likesCount,
  });

  const handleLike = async () => {
    const response = await LikeService.likeOrUnlikeNotes(initialNotes?._id);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);

      setLikeState((prev) => ({
        isLiked: response?.data?.isLiked,
        count: response?.data?.isLiked ? prev.count + 1 : prev.count - 1,
      }));
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return {
    likeState,
    handleLike,
  };
};
