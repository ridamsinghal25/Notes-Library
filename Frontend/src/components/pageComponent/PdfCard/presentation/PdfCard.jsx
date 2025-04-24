"use client";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {notes.notes?.map((note, index) => (
        <div key={note?._id} className="group/card perspective">
          <div
            className={`relative max-w-xs h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 dark:border-gray-700 preserve-3d`}
          >
            <div className="p-5">
              <div className="flex items-start space-x-2 mb-4 relative">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg shadow-sm group-hover/card:shadow-md transition-shadow duration-300">
                  <FileText className="w-6 h-6 text-red-500 dark:text-red-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="pr-16">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 line-clamp-1 group-hover/card:text-violet-700 dark:group-hover/card:text-violet-400 transition-colors duration-300">
                      {notes?.chapterName}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <CircleUser className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      <span className="truncate">{note?.owner}</span>
                    </div>
                  </div>
                </div>

                {userRole === UserRolesEnum.ADMIN &&
                  userId === note?.createdBy && (
                    <div className="absolute top-0 right-0 flex items-center gap-2">
                      <Button
                        title="Delete Notes"
                        variant="outline"
                        className="flex items-center justify-center p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 border-none shadow-sm hover:shadow-md transition-shadow duration-300"
                        onClick={() =>
                          toggleModalOfPdfCard("deleteModal", note?._id)
                        }
                      >
                        <Trash2 className="text-red-600 dark:text-red-400 w-4 h-4" />
                      </Button>
                      <Button
                        title="Update Notes"
                        variant="outline"
                        className="flex items-center justify-center p-2 rounded-full bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/30 dark:hover:bg-violet-800/50 border-none shadow-sm hover:shadow-md transition-shadow duration-300"
                        onClick={() => navigateToUpdateNotesPage(note?._id)}
                      >
                        <Pencil className="text-violet-600 dark:text-violet-400 w-4 h-4" />
                      </Button>
                    </div>
                  )}
              </div>

              <div className="relative group/preview overflow-hidden rounded-xl">
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover/preview:translate-x-full transition-transform duration-1500 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 pointer-events-none"></div>

                <div className="overflow-hidden rounded-xl">
                  <img
                    src={
                      getPreviewImageUrl(note?.pdf?.url) || "/placeholder.svg"
                    }
                    alt="PDF Preview"
                    className="object-cover w-full h-56 rounded-xl transform transition-transform duration-700 group-hover/preview:scale-110"
                  />
                </div>

                <div
                  onClick={() => navigateToPdfPage(note?._id)}
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/40 backdrop-blur-[2px] opacity-0 group-hover/preview:opacity-100 transition-all duration-300 rounded-xl flex items-center justify-center cursor-pointer"
                >
                  <Button
                    variant="outline"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300 transform scale-90 group-hover/preview:scale-100 shadow-lg"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    <span>View PDF</span>
                  </Button>
                </div>

                <Button
                  title="Download PDF"
                  variant="outline"
                  className="absolute right-1 bottom-1 flex items-center justify-center p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-violet-100 dark:hover:bg-violet-900/50 cursor-pointer shadow-lg border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-110 hover:shadow-violet-500/30 dark:hover:shadow-violet-700/30"
                  onClick={() =>
                    handleDownload(note?.pdf.url, notes?.chapterName, index)
                  }
                >
                  <Download className="text-violet-600 dark:text-violet-400 w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2 relative">
                <Button
                  onClick={() => handleLike(note, notes.chapterNumber)}
                  className={`p-1.5 rounded-full bg-gray-100 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-violet-900/50 transition-all duration-300 `}
                  variant="ghost"
                  aria-label={note.isLiked ? "Unlike" : "Like"}
                >
                  {note.isLiked ? <ThumbsUpDark /> : <ThumbsUpLight />}
                </Button>

                <span className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-violet-500/30 dark:hover:shadow-violet-700/30 text-sm group-hover/card:shadow-lg">
                  {/* Count animation on change */}
                  <span className={`inline-block `}>{note.likesCount}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-violet-500/30 dark:hover:shadow-violet-700/30 text-sm group-hover/card:shadow-lg">
                  {note.commentsCount}
                </span>
                <Button
                  className="p-1.5 rounded-full bg-gray-100 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-violet-900/50 transition-all duration-300 hover:shadow-md"
                  variant="ghost"
                  onClick={() => navigateToComment(note?._id)}
                  aria-label="View comments"
                >
                  <MessageCircle className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PDFCard;
