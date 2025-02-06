import React from "react";
import {
  CircleUser,
  Download,
  ExternalLink,
  FileText,
  MessageCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThumbsUpDark } from "@/assets/ThumbsUpDark";
import { ThumbsUpLight } from "@/assets/ThumbsUpLight";
import { getPreviewImageUrl } from "@/utils/getImageUrl";
import { UserRolesEnum } from "@/constants/constants";

const PDFCard = ({
  notes,
  handleLike,
  toggleModalOfPdfCard,
  navigateToComment,
  userRole,
  userId,
  handleDownload,
  navigateToUpdateNotesPage,
  navigateToPdfPage,
}) => {
  return (
    <div>
      {notes.mergedNotes?.map((note, index) => (
        <div
          key={note?._id}
          className="w-72 mx-auto my-8 bg-gray-100 rounded-lg shadow-md overflow-hidden dark:shadow-gray-300 dark:border-t-2 dark:bg-black"
        >
          <div className="p-4">
            <div className="flex items-start space-x-2 mb-3 relative">
              <FileText className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0 items-start justify-between">
                <div className="flex flex-col pr-20">
                  <h2 className="text-lg font-semibold text-gray-800 truncate dark:text-gray-200">
                    {note?.chapterName}
                  </h2>
                  <div className="flex gap-1 items-end text-sm text-gray-500 dark:text-gray-200 truncate">
                    <div className="text-purple-600">
                      <CircleUser />
                    </div>
                    <div>{note?.owner}</div>
                  </div>
                </div>
              </div>
              {userRole === UserRolesEnum.ADMIN &&
                userId === note?.createdBy && (
                  <div className="flex items-center gap-2 absolute top-0 right-0">
                    <Button
                      title="Delete Notes"
                      variant="outline"
                      className="flex items-center justify-center p-2 rounded-full bg-red-200 hover:bg-red-300"
                      onClick={() =>
                        toggleModalOfPdfCard("deleteModal", note?._id)
                      }
                    >
                      <Trash2 className="text-red-600 w-5 h-5" />
                    </Button>
                    <Button
                      title="Update Notes"
                      variant="outline"
                      className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                      onClick={() => navigateToUpdateNotesPage(note?._id)}
                    >
                      <Pencil className="text-gray-600 w-5 h-5" />
                    </Button>
                  </div>
                )}
            </div>

            <div className="relative aspect-w-3 aspect-h-4 flex justify-center items-center">
              <img
                src={getPreviewImageUrl(note.pdf.url)}
                alt="PDF Preview"
                className="object-contain w-64 h-56 rounded-lg shadow-md"
              />
              <Button
                variant="outline"
                onClick={() => navigateToPdfPage(note?._id)}
                className="absolute w-64 h-full inset-0 flex items-center justify-center bg-black dark:bg-gray-300 text-white opacity-0 hover:opacity-50 dark:hover:opacity-50 transition-opacity duration-300 rounded"
              >
                <ExternalLink className="w-10 h-10" />
              </Button>

              <Button
                title="Download Pdf"
                variant="outline"
                className="absolute -right-1 -bottom-6 -translate-y-1/2 flex items-center justify-center p-2 rounded-full bg-white hover:bg-blue-100 cursor-pointer shadow-md"
                onClick={() =>
                  handleDownload(note?.pdf.url, note?.chapterName, index)
                }
              >
                <Download className="text-gray-600 w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="p-3 border-t border-gray-200 flex justify-between items-center dark:text-gray-200">
            <div className="flex items-center gap-1 cursor-pointer">
              <Button
                onClick={() => handleLike(notes)}
                className="p-2 mr-1"
                variant="ghost"
              >
                {note.isLiked ? <ThumbsUpDark /> : <ThumbsUpLight />}
              </Button>

              <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
                {note.likesCount}
              </span>
            </div>
            <div className="flex items-center gap-2 ">
              <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
                {note.commentsCount}
              </span>
              <Button
                className="p-2 mr-1"
                onClick={() => navigateToComment(note?._id)}
              >
                <MessageCircle size={28} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PDFCard;
