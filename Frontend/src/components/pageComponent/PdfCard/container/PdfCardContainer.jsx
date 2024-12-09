import React, { useState } from "react";
import { getPreviewImageUrl } from "@/utils/getImageUrl";
import { useDispatch, useSelector } from "react-redux";
import { UserRolesEnum } from "@/constants/constants";
import { setSelectedNotes, toggleModal } from "@/store/ModalSlice";
import PDFCard from "../presentation/PdfCard";
import LikeService from "@/services/LikeService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";

const PDFCardContainer = ({ notes }) => {
  const [likeState, setLikeState] = useState({
    isLiked: notes.isLiked,
    count: notes.likesCount,
  });
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();

  const previewImageUrl = getPreviewImageUrl(notes?.pdf?.url);

  const toggleModalOfPdfCard = (modalType, notes, displayPdf) => {
    dispatch(toggleModal({ modalType }));
    if (notes) {
      dispatch(setSelectedNotes(notes));
    }

    if (displayPdf) {
      navigate(ROUTES.PDF);
    }
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

  const setShowCommentModal = (notes) => {
    dispatch(toggleModal({ modalType: "commentModal" }));
    dispatch(setSelectedNotes(notes));
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
      toggleModalOfPdfCard={toggleModalOfPdfCard}
      setShowCommentModal={setShowCommentModal}
      isAdmin={isAdmin}
    />
  );
};

export default PDFCardContainer;
