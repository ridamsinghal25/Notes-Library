// usePDFCardState.js
import { useState } from "react";
import { toast } from "react-toastify";
import LikeService from "@/services/LikeService";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";

export const usePDFCardState = (initialNotes) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likeState, setLikeState] = useState({
    isLiked: initialNotes.isLiked,
    count: initialNotes.likesCount,
  });
  const [modalState, setModalState] = useState({
    showPDF: false,
    showUpdatePdfModal: false,
    showUploadNotesModal: false,
  });

  const toggleModal = (modalName) => {
    setModalState((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

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

  const onNotesUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotes(initialNotes?._id, data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);

      setModalState((prev) => ({
        ...prev,
        showUploadNotesModal: false,
      }));

      setTimeout(() => window.location.reload(), 2000);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return {
    isSubmitting,
    likeState,
    modalState,
    toggleModal,
    handleLike,
    onNotesUpdate,
  };
};
