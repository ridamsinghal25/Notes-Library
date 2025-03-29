import { useDispatch, useSelector } from "react-redux";
import { setSelectedNotes, toggleModal } from "@/store/ModalSlice";
import PDFCard from "../presentation/PdfCard";
import LikeService from "@/services/LikeService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { toggleLikeState } from "@/store/NotesSlice";
import { cloudinaryPdfUrl } from "@/utils/cloudinaryPdfUrl";

const PDFCardContainer = ({ notes }) => {
  const navigate = useNavigate();

  const userRole = useSelector((state) => state.auth.userDetails?.role);
  const userId = useSelector((state) => state.auth.userDetails?._id);
  const dispatch = useDispatch();

  const toggleModalOfPdfCard = (modalType, notesId) => {
    dispatch(toggleModal({ modalType }));

    if (notesId) {
      dispatch(setSelectedNotes(notesId));
    }
  };

  const handleLike = async (notes, chapterNumber) => {
    const response = await LikeService.likeOrUnlikeNotes(notes._id);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      dispatch(
        toggleLikeState({
          chapterNumber: chapterNumber,
          noteId: notes._id,
          isLiked: response?.data?.isLiked,
        })
      );
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const handleDownload = async (url, chapterName, index) => {
    const newPdfUrl = cloudinaryPdfUrl(url, chapterName, index);

    const link = document.createElement("a");
    link.href = newPdfUrl;
    link.download = `${chapterName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigateToComment = (notesId) => {
    navigate(`${ROUTES.COMMENT?.replace(":notesId", notesId)}`);
  };

  const navigateToUpdateNotesPage = (notesId) => {
    navigate(`${ROUTES.UPDATE_NOTES}/?notesId=${notesId}`);
  };

  const navigateToPdfPage = (notesId) => {
    navigate(`${ROUTES.PDF}/?notesId=${notesId}`);
  };

  return (
    <div>
      <PDFCard
        notes={notes}
        handleLike={handleLike}
        toggleModalOfPdfCard={toggleModalOfPdfCard}
        navigateToComment={navigateToComment}
        userRole={userRole}
        userId={userId}
        handleDownload={handleDownload}
        navigateToUpdateNotesPage={navigateToUpdateNotesPage}
        navigateToPdfPage={navigateToPdfPage}
      />
    </div>
  );
};

export default PDFCardContainer;
