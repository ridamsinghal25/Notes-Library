import { useDispatch, useSelector } from "react-redux";
import { setSelectedNotes, toggleModal } from "@/store/ModalSlice";
import PDFCard from "../presentation/PdfCard";
import LikeService from "@/services/LikeService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { toggleLikeState } from "@/store/NotesSlice";
import { setNotesId } from "@/store/CommentSlice";

const PDFCardContainer = ({ notes }) => {
  const navigate = useNavigate();

  const userRole = useSelector((state) => state.auth.userDetails?.role);
  const userId = useSelector((state) => state.auth.userDetails?._id);
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

  const handleDownload = async (url, chapterName) => {
    const newPdfUrl = url.replace(
      /\/upload/,
      `/upload/fl_attachment:${encodeURIComponent(chapterName)}`
    );

    const link = document.createElement("a");
    link.href = newPdfUrl;
    link.download = `${chapterName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const setShowCommentModal = (notesId) => {
    dispatch(toggleModal({ modalType: "commentModal" }));
    dispatch(setNotesId(notesId));
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
          userRole={userRole}
          userId={userId}
          handleDownload={handleDownload}
        />
      ))}
    </div>
  );
};

export default PDFCardContainer;
