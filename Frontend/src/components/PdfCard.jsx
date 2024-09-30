import React, { useState } from "react";
import { ExternalLink, FileText, Pencil, Trash2 } from "lucide-react";
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
import UploadNotes from "./modals/UploadNotes";
import DeleteNotes from "./modals/DeleteNotes";

const PDFCard = ({ notes }) => {
  const { pdf, owner, chapterName, isLiked, likesCount } = notes;
  const pdfUrl = pdf?.url;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likeState, setLikeState] = useState({
    isLiked: isLiked,
    count: likesCount,
  });
  const [modalState, setModalState] = useState({
    showPDF: false,
    showUpdatePdfModal: false,
    showUploadNotesModal: false,
    showDeleteNotesModal: false,
  });

  const userInfo = useSelector((state) => state.auth.userDetails);

  const togglePDFView = () => {
    setModalState((prev) => ({ ...prev, showPDF: !prev.showPDF }));
  };

  const toggleUpdatePdfModal = () => {
    setModalState((prev) => ({
      ...prev,
      showUpdatePdfModal: !prev.showUpdatePdfModal,
    }));
  };

  const toggleUpdateNotesModal = () => {
    setModalState((prev) => ({
      ...prev,
      showUploadNotesModal: !prev.showUploadNotesModal,
    }));
  };

  const toggleDeleteNotesModal = () => {
    setModalState((prev) => ({
      ...prev,
      showDeleteNotesModal: !prev.showDeleteNotesModal,
    }));
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

  const updatePdfFile = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotesPdfFile(
      notes?._id,
      data?.pdfFile
    );

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);

      setModalState((prev) => ({
        ...prev,
        showUpdatePdfModal: false,
      }));

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const onNotesUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotes(notes?._id, data);

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

  const previewImageUrl = getPreviewImageUrl(pdfUrl);

  const isAdmin =
    userInfo?.role === USER_ROLE.ADMIN && userInfo?._id === notes?.createdBy;

  return (
    <div className="w-72 mx-auto my-8 bg-gray-100 rounded-lg shadow-md overflow-hidden dark:shadow-gray-300 dark:border-t-2 dark:bg-black">
      <div className="p-4">
        <div className="flex items-start space-x-2 mb-3">
          <FileText className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-gray-800 truncate dark:text-gray-200 mb-2 sm:mb-0">
                {chapterName}
              </h2>
              {isAdmin && (
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <Button
                    title="Update Notes"
                    variant="outline"
                    className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    onClick={toggleUpdateNotesModal}
                  >
                    <FilePen className="text-gray-600 w-5 h-5" />
                  </Button>
                  <Button
                    title="Delete Notes"
                    variant="outline"
                    className="flex items-center justify-center p-2 rounded-full bg-red-200 hover:bg-red-300"
                    onClick={toggleDeleteNotesModal}
                  >
                    <Trash2 className="text-red-600 w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-200">PDF</p>
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
          {isAdmin && (
            <Button
              title="Update Pdf"
              variant="outline"
              className="absolute -right-1 top-3 -translate-y-1/2 flex items-center justify-center p-2 rounded-full bg-white hover:bg-blue-100 cursor-pointer shadow-md"
              onClick={toggleUpdatePdfModal}
            >
              <Pencil className="text-gray-600 w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      <UploadNotes
        showDialog={modalState.showUploadNotesModal}
        setShowDialog={toggleUpdateNotesModal}
        notesInfo={notes}
        onSubmit={onNotesUpdate}
        isSubmitting={isSubmitting}
        isUpdateMode={true}
      />

      <DeleteNotes
        showDialog={modalState.showDeleteNotesModal}
        setShowDialog={toggleDeleteNotesModal}
        notesId={notes?._id}
      />

      <UpdatePdfFile
        showDialog={modalState.showUpdatePdfModal}
        setShowDialog={toggleUpdatePdfModal}
        onSubmit={updatePdfFile}
        isSubmitting={isSubmitting}
      />

      <PDFModal
        pdfUrl={pdfUrl}
        showDialog={modalState.showPDF}
        setShowDialog={togglePDFView}
        chapterName={chapterName}
      />

      <div className="p-3 border-t border-gray-200 flex justify-between items-center dark:text-gray-200">
        <div
          onClick={handleLike}
          className="flex items-center gap-2 cursor-pointer"
        >
          {likeState.isLiked ? <ThumbsUpDark /> : <ThumbsUpLight />}

          <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            {likeState.count}
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

export default PDFCard;
