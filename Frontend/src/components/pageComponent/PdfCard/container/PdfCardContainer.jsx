import { useDispatch, useSelector } from "react-redux";
import { setSelectedNotes, toggleModal } from "@/store/ModalSlice";
import PDFCard from "../presentation/PdfCard";
import LikeService from "@/services/LikeService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { toggleLikeState } from "@/store/NotesSlice";

const PDFCardContainer = ({ notes }) => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();

  const toggleModalOfPdfCard = (modalType, notes, displayPdf) => {
    dispatch(toggleModal({ modalType }));
    if (notes) {
      dispatch(setSelectedNotes(notes));
    }

    if (displayPdf) {
      navigate(ROUTES.PDF);
    }
  };

  const handleLike = async (notes) => {
    const response = await LikeService.likeOrUnlikeNotes(notes._id);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      dispatch(
        toggleLikeState({
          chapterNumber: notes.chapterNumber,
          subject: notes.subject,
          noteId: notes._id,
          isLiked: response?.data?.isLiked,
        })
      );
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const setShowCommentModal = (notes) => {
    dispatch(toggleModal({ modalType: "commentModal" }));
    dispatch(setSelectedNotes(notes));
  };

  return (
    <div>
      {notes.mergedNotes?.map((note) => (
        <PDFCard
          key={note._id}
          notes={note}
          handleLike={handleLike}
          toggleModalOfPdfCard={toggleModalOfPdfCard}
          setShowCommentModal={setShowCommentModal}
          userInfo={userInfo}
        />
      ))}
    </div>
  );
};

export default PDFCardContainer;
