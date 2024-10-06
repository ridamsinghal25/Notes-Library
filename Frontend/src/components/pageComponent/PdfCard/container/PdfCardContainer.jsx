import React from "react";
import { getPreviewImageUrl } from "@/utils/getImageUrl";
import { useDispatch, useSelector } from "react-redux";
import { UserRolesEnum } from "@/constants/constants";
import { toggleModal } from "@/store/ModalSlice";
import PDFCard from "../presentation/PdfCard";

const PDFCardContainer = ({ notes }) => {
  const [likeState, setLikeState] = useState({
    isLiked: initialNotes.isLiked,
    count: initialNotes.likesCount,
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
