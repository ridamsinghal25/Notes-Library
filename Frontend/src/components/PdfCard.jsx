import React, { useState } from "react";
import { ExternalLink, FileText, Pencil } from "lucide-react";
import PDFModal from "./modals/PDFModal";
import { toast } from "react-toastify";
import LikeService from "@/services/LikeService";
import ApiError from "@/services/ApiError";
import { FilePen, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { getPreviewImageUrl } from "@/utils/getImageUrl";
import { ThumbsUpDark } from "@/assets/ThumbsUpDark";
import { ThumbsUpLight } from "@/assets/ThumbsUpLight";
import { useSelector } from "react-redux";
import { USER_ROLE } from "@/constants/constants";
import { UpdatePdfFile } from "./modals/UpdatePdfFile";
import NotesService from "@/services/NotesService";

const PDFCard = ({ notes }) => {
  const { pdf, owner, chapterName, isLiked, likesCount } = notes;
  const pdfUrl = pdf?.url;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [notesLike, setNotesLike] = useState(isLiked);
  const [notesLikeCount, setNotesLikeCount] = useState(likesCount);
  const userInfo = useSelector((state) => state.auth.userDetails);
  const [showUpdatePdfModal, setShowUpdatePdfModal] = useState(false);

  const togglePDFView = () => {
    setShowPDF(!showPDF);
  };

  const toggleUpdatePdfModal = () => {
    setShowUpdatePdfModal(!showUpdatePdfModal);
  };

  const toggleLike = async () => {
    const response = await LikeService.likeOrUnlikeNotes(notes?._id);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);

      if (response?.data?.isLiked) {
        setNotesLike(true);
        setNotesLikeCount(notesLikeCount + 1);
      } else {
        setNotesLike(false);
        setNotesLikeCount(notesLikeCount - 1);
      }
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const updatePdfFile = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotesPdfFile(
      notes?._id,
      data?.pdfFile
    );

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      setShowUpdatePdfModal(false);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const previewImageUrl = getPreviewImageUrl(pdfUrl);

  return (
    <div className="w-72 mx-auto my-8 bg-gray-100 rounded-lg shadow-md overflow-hidden dark:shadow-gray-300 dark:border-t-2 dark:bg-black">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <FileText className="w-8 h-8 text-red-500" />
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800 truncate  dark:text-gray-200">
                {chapterName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-200">PDF</p>
            </div>
          </div>
        </div>
        <div className="relative aspect-w-3 aspect-h-4 flex justify-center items-center">
          <img
            src={previewImageUrl}
            alt="PDF Preview"
            className="object-contain w-64 h-56 rounded-lg shadow-md"
          />
          <Button
            variant="outline"
            onClick={togglePDFView}
            className="absolute w-64 h-full inset-0 flex items-center justify-center bg-black dark:bg-gray-300 text-white opacity-0 hover:opacity-50 dark:hover:opacity-50 transition-opacity duration-300 rounded"
          >
            <ExternalLink className="w-10 h-10" />
          </Button>
          {userInfo?.role === USER_ROLE.ADMIN &&
            userInfo?._id === notes?.createdBy && (
              <Button
                title="Update Pdf"
                variant="outline"
                className="absolute -right-3 top-3 -translate-y-1/2 flex items-center justify-center p-2 rounded-full bg-white hover:bg-blue-100 cursor-pointer shadow-md"
                onClick={toggleUpdatePdfModal}
              >
                <Pencil className="text-gray-600 w-5 h-5" />
              </Button>
            )}
        </div>
      </div>

      <UpdatePdfFile
        showDialog={showUpdatePdfModal}
        setShowDialog={setShowUpdatePdfModal}
        onSubmit={updatePdfFile}
        isSubmitting={isSubmitting}
      />

      <PDFModal
        pdfUrl={pdfUrl}
        showDialog={showPDF}
        setShowDialog={setShowPDF}
        chapterName={chapterName}
      />

      <div className="p-3 border-t border-gray-200 flex justify-between items-center dark:text-gray-200">
        <div
          onClick={toggleLike}
          className="flex items-center gap-2 cursor-pointer"
        >
          {notesLike ? <ThumbsUpDark /> : <ThumbsUpLight />}

          <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            {notesLikeCount}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500  dark:text-gray-200">Owner:</p>{" "}
          <p className="text-sm font-semibold text-black dark:text-gray-200">
            {owner}
          </p>
        </div>
      </div>
    </div>
  );
};

const withActionButtons = (WrappedComponent) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute top-2 right-1 flex items-center gap-2 z-10 mt-2">
          <Button
            title="Update Notes"
            variant="outline"
            className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
            onClick={() => props.updateButtonHandler(props.notes)}
          >
            <FilePen className="text-gray-600 w-6 h-6" />
          </Button>
          <Button
            title="Delete Notes"
            variant="outline"
            className="flex items-center justify-center p-2 rounded-full bg-red-200 hover:bg-red-300 cursor-pointer"
            onClick={() => props.deleteButtonHandler(props.notes)}
          >
            <Trash2Icon className="text-red-600 w-6 h-6" />
          </Button>
        </div>
        <WrappedComponent notes={props.notes} />
      </div>
    );
  };
};

export default PDFCard;
export { withActionButtons };
