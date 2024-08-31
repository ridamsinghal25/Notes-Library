import React, { useState } from "react";
import { ExternalLink, FileText, ThumbsUp } from "lucide-react";
import PDFModal from "./modals/PDFModal";
import { toast } from "react-toastify";
import LikeService from "@/services/LikeService";
import ApiError from "@/services/ApiError";

const PDFCard = ({
  pdfUrl,
  owner,
  chapterName,
  isLiked,
  likesCount,
  notesId,
}) => {
  const [showPDF, setShowPDF] = useState(false);
  const [like, setLike] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likesCount);

  const togglePDFView = () => {
    setShowPDF(!showPDF);
  };

  const toggleLike = async () => {
    const response = await LikeService.likeOrUnlikeNotes(notesId);

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
      toast.success(response?.errorResponse?.message || response?.errorMessage);
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

export default PDFCard;
