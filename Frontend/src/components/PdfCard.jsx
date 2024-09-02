import React, { useState } from "react";
import { ExternalLink, FileText, ThumbsUp } from "lucide-react";
import PDFModal from "./modals/PDFModal";
import { toast } from "react-toastify";
import LikeService from "@/services/LikeService";
import ApiError from "@/services/ApiError";
import { FilePen, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

const PDFCard = ({ notes }) => {
  const { pdf, owner, chapterName, isLiked, likesCount } = notes;
  const pdfUrl = pdf?.url;

  const [showPDF, setShowPDF] = useState(false);
  const [like, setLike] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likesCount);

  const togglePDFView = () => {
    setShowPDF(!showPDF);
  };

  const toggleLike = async () => {
    const response = await LikeService.likeOrUnlikeNotes(notes?._id);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Liked successfully", {
        autoClose: 2000,
      });

      if (likeCount > likesCount) {
        setLike(false);
        setLikeCount(likeCount - 1);
      } else {
        setLike(true);
        setLikeCount(likeCount + 1);
      }
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const transformation = "upload/c_thumb,w_400,h_600,pg_1/";

  const splitPdfUrl = pdfUrl?.split("upload/");

  const previewImageUrl = splitPdfUrl
    ?.join(transformation)
    ?.replace(".pdf", ".jpg");

  return (
    <div className="w-72 mx-auto my-8 bg-gray-100 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <FileText className="w-8 h-8 text-red-500" />
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {chapterName}
              </h2>
              <p className="text-sm text-gray-500">PDF</p>
            </div>
          </div>
        </div>
        <div className="relative aspect-w-3 aspect-h-4 flex justify-center items-center">
          <img
            src={previewImageUrl}
            alt="PDF Preview"
            className="object-contain w-64 h-56 rounded-lg shadow-md"
          />
          <button
            onClick={togglePDFView}
            className="absolute w-64 inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 rounded"
          >
            <ExternalLink className="w-10 h-10" />
          </button>
        </div>
      </div>

      {showPDF && (
        <PDFModal
          pdfUrl={pdfUrl}
          togglePDFView={togglePDFView}
          chapterName={chapterName}
        />
      )}

      <div className="p-3 border-t border-gray-200 flex justify-between items-center">
        <div
          onClick={toggleLike}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ThumbsUp
            className={`transition-colors duration-300 ml-3 ${
              like ? "text-black" : "text-slate-400"
            }`}
          />
          <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            {likeCount}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Owner:</p>{" "}
          <p className="text-sm font-semibold text-black">{owner}</p>
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
            variant="outline"
            className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
            onClick={() => props.updateButtonHandler(props.notes)}
          >
            <FilePen className="text-gray-600 w-6 h-6" />
          </Button>
          <Button
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
