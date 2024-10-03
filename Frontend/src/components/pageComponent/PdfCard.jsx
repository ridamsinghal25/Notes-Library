import React from "react";
import { ExternalLink, FileText, Pencil, Trash2 } from "lucide-react";
import PDFModal from "../modals/PDFModal";
import { FilePen } from "lucide-react";
import { Button } from "../ui/button";
import { getPreviewImageUrl } from "@/utils/getImageUrl";
import { ThumbsUpDark } from "@/assets/ThumbsUpDark";
import { ThumbsUpLight } from "@/assets/ThumbsUpLight";
import { useDispatch, useSelector } from "react-redux";
import { UserRolesEnum } from "@/constants/constants";
import { UpdatePdfFile } from "../modals/UpdatePdfFile";
import UploadNotes from "../modals/UploadNotes";
import { usePDFCardState } from "@/hooks/usePDFCardState";
import DeleteNotesModalContainer from "../modals/deletemodal/container/DeleteNotesModalContainer";
import { toggleModal } from "@/store/ModalSlice";
import PDFModalContainer from "../modals/pdfmodal/container/PDFModalContainer";
toggleModalState;

const PDFCard = ({ notes }) => {
  const { pdf, owner, chapterName } = notes;
  const pdfUrl = pdf?.url;

  const userInfo = useSelector((state) => state.auth.userDetails);
  const dispatch = useDispatch();

  const {
    isSubmitting,
    likeState,
    modalState,
    toggleModal: toggleModalState,
    handleLike,
    updatePdfFile,
    onNotesUpdate,
  } = usePDFCardState(notes);

  const previewImageUrl = getPreviewImageUrl(pdfUrl);

  const toggelDeleteModal = () => {
    dispatch(toggleModal({ modalType: "deleteNotesModal" }));
  };

  const togglePDFModal = () => {
    dispatch(toggleModal({ modalType: "showPdfModal" }));
  };

  const isAdmin =
    userInfo?.role === UserRolesEnum.ADMIN &&
    userInfo?._id === notes?.createdBy;

  return (
    <div className="w-72 mx-auto my-8 bg-gray-100 rounded-lg shadow-md overflow-hidden dark:shadow-gray-300 dark:border-t-2 dark:bg-black">
      <div className="p-4">
        <div className="flex items-start space-x-2 mb-3 relative">
          <FileText className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
          <div className="flex-1 min-w-0 items-start justify-between">
            <div className="flex flex-col pr-20">
              <h2 className="text-lg font-semibold text-gray-800 truncate dark:text-gray-200">
                {chapterName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-200">PDF</p>
            </div>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-2 absolute top-0 right-0">
              <Button
                title="Update Notes"
                variant="outline"
                className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                onClick={() => toggleModalState("showUploadNotesModal")}
              >
                <FilePen className="text-gray-600 w-5 h-5" />
              </Button>
              <Button
                title="Delete Notes"
                variant="outline"
                className="flex items-center justify-center p-2 rounded-full bg-red-200 hover:bg-red-300"
                onClick={toggelDeleteModal}
              >
                <Trash2 className="text-red-600 w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        <div className="relative aspect-w-3 aspect-h-4 flex justify-center items-center">
          <img
            src={previewImageUrl}
            alt="PDF Preview"
            className="object-contain w-64 h-56 rounded-lg shadow-md"
          />
          <Button
            variant="outline"
            onClick={togglePDFModal}
            className="absolute w-64 h-full inset-0 flex items-center justify-center bg-black dark:bg-gray-300 text-white opacity-0 hover:opacity-50 dark:hover:opacity-50 transition-opacity duration-300 rounded"
          >
            <ExternalLink className="w-10 h-10" />
          </Button>
          {isAdmin && (
            <Button
              title="Update Pdf"
              variant="outline"
              className="absolute -right-1 top-3 -translate-y-1/2 flex items-center justify-center p-2 rounded-full bg-white hover:bg-blue-100 cursor-pointer shadow-md"
              onClick={() => toggleModalState("showUpdatePdfModal")}
            >
              <Pencil className="text-gray-600 w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      <UploadNotes
        showDialog={modalState.showUploadNotesModal}
        setShowDialog={() => toggleModalState("showUploadNotesModal")}
        notesInfo={notes}
        onSubmit={onNotesUpdate}
        isSubmitting={isSubmitting}
        isUpdateMode={true}
      />

      <DeleteNotesModalContainer notesId={notes?._id} />

      <UpdatePdfFile
        showDialog={modalState.showUpdatePdfModal}
        setShowDialog={() => toggleModalState("showUpdatePdfModal")}
        onSubmit={updatePdfFile}
        isSubmitting={isSubmitting}
      />

      <PDFModalContainer pdfUrl={pdfUrl} chapterName={chapterName} />

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
