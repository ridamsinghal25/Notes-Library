import React, { useState } from "react";
import { getPreviewImageUrl } from "@/utils/getImageUrl";
import { useDispatch, useSelector } from "react-redux";
import { UserRolesEnum } from "@/constants/constants";
import { toggleModal } from "@/store/ModalSlice";
import PDFCard from "../presentation/PdfCard";
import LikeService from "@/services/LikeService";
import ApiError from "@/services/ApiError";

const PDFCardContainer = ({ notes }) => {
  const [likeState, setLikeState] = useState({
    isLiked: notes.isLiked,
    count: notes.likesCount,
  });

  const userInfo = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();

  const previewImageUrl = getPreviewImageUrl(notes?.pdf?.url);

  const toggelDeleteModal = () => {
    dispatch(toggleModal({ modalType: "deleteNotesModal" }));
  };

  const togglePDFModal = () => {
    dispatch(toggleModal({ modalType: "showPdfModal" }));
  };

  const togglePdfFileModal = () => {
    dispatch(toggleModal({ modalType: "updatePdfFileModal" }));
  };

  const toggleNotesModal = () => {
    dispatch(toggleModal({ modalType: "notesModal" }));
  };

  const handleLike = async () => {
    const response = await LikeService.likeOrUnlikeNotes(notes?._id);

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

  const isAdmin =
    userInfo?.role === UserRolesEnum.ADMIN &&
    userInfo?._id === notes?.createdBy;

  return (
    <PDFCard
      notes={notes}
      likeState={likeState}
      handleLike={handleLike}
      previewImageUrl={previewImageUrl}
      toggelDeleteModal={toggelDeleteModal}
      togglePDFModal={togglePDFModal}
      togglePdfFileModal={togglePdfFileModal}
      toggleNotesModal={toggleNotesModal}
      isAdmin={isAdmin}
    />
  );
};

export default PDFCardContainer;
