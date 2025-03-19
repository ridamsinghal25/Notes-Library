import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Pencil,
  Trash2,
  Download,
  Trash,
  Info,
  FileText,
  Files,
} from "lucide-react";
import { getDayOfWeek } from "@/utils/getDayOfWeek";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserRolesEnum } from "@/constants/constants";
import DeleteModalContainer from "@/components/modals/deletemodal/container/DeleteModalContainer";
import DeleteChapterNotesModalContainer from "@/components/modals/deletechapternotesmodal/container/DeleteChapterNotesModalContainer";
import ListDailyNotesSkeleton from "@/components/basic/ListDailyNotesSkeleton";

function ListDailyNotes({
  zoomLevel,
  selectedNote,
  setSelectedNote,
  currentImageIndex,
  setCurrentImageIndex,
  subject,
  chapterName,
  dailyNotes,
  zoomIn,
  zoomOut,
  resetZoom,
  handlePrevImage,
  handleNextImage,
  userRole,
  navigateToUpdateDailyNotesPage,
  navigateToCreatePDFPage,
  toggleModalOfPdfCard,
  onDeleteHandler,
  isDeleting,
  handleDownload,
  toggelDeleteChapterNotesModal,
}) {
  const isAdminOrModerator =
    userRole === UserRolesEnum.ADMIN || userRole === UserRolesEnum.MODERATOR;

  if (dailyNotes?.status === "loading") {
    return <ListDailyNotesSkeleton />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 transition-colors duration-200 ">
      <HelmetProvider>
        <Helmet>
          <title>List Notes</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a list daily notes page" />
        </Helmet>
      </HelmetProvider>
      {userRole === UserRolesEnum.ADMIN && (
        <div className="absolute top-4 right-20 z-10 flex gap-4">
          <Button onClick={toggelDeleteChapterNotesModal}>
            <Trash />
          </Button>
        </div>
      )}

      <div className="absolute top-4 right-4 z-10 flex gap-4">
        <Button onClick={navigateToCreatePDFPage}>
          <Files />
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        Notes for {subject}
      </h1>
      <div className="flex items-center mb-4 flex-col sm:flex-row justify-center sm:justify-normal gap-4">
        <div className="text-2xl mt-3 sm:mt-0 text-center font-semibold text-gray-800 dark:text-gray-200">
          Unit
        </div>
        <div className="bg-violet-600 text-white font-bold py-2 px-4 rounded-lg mr-4 dark:bg-violet-700">
          {chapterName}
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <DeleteModalContainer
          onDeleteHandler={onDeleteHandler}
          isDeleting={isDeleting}
        />

        <DeleteChapterNotesModalContainer />

        {!dailyNotes?.notes.length ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-600 text-xl font-semibold dark:text-gray-400">
              No notes available for this chapter
            </p>
          </div>
        ) : (
          dailyNotes?.notes
            .filter(
              (note) =>
                note.subject === subject && note.chapterName === chapterName
            )
            .map((notes) => (
              <div key={notes._id} className="mb-8">
                <div className="mb-6 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="p-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-2">
                          <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-violet-600 dark:text-violet-400" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                          {new Date(notes?.createdAt).getDate() ===
                          new Date().getDate()
                            ? "Today"
                            : new Date(notes?.createdAt).getDate() ===
                              new Date().getDate() - 1
                            ? "Yesterday"
                            : new Date(notes?.createdAt).toDateString()}
                        </h4>
                        <p className="mt-1 flex items-center space-x-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                          <Info className="w-4 h-4 text-violet-500" />
                          <span>
                            {notes?.updatedBy ? "Updated" : "Created"} by{" "}
                            <span className="font-medium text-violet-700 dark:text-violet-400">
                              {(notes?.updatedBy || notes.createdBy)?.fullName}
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {getDayOfWeek(notes?.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-violet-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {notes?.notes.length} page
                          {notes?.notes.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-600"></div>
                </div>

                <div className="flex flex-wrap justify-start gap-4 p-4">
                  {isAdminOrModerator && (
                    <div className="w-full flex justify-end items-start gap-4 relative -mt-6">
                      <Button
                        title="Update Notes"
                        variant="outline"
                        className="flex items-center justify-center p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          navigateToUpdateDailyNotesPage(notes?._id)
                        }
                      >
                        <Pencil className="text-gray-600 w-5 h-5" />
                      </Button>
                      <Button
                        title="Delete Notes"
                        variant="outline"
                        className="flex items-center justify-center p-2 rounded-full bg-red-200 hover:bg-red-300"
                        onClick={() =>
                          toggleModalOfPdfCard("deleteModal", notes?._id)
                        }
                      >
                        <Trash2 className="text-red-600 w-5 h-5" />
                      </Button>
                    </div>
                  )}

                  {notes?.notes.map((item, index) => (
                    <div key={item.public_id} className="relative group">
                      <img
                        src={item?.url || "/placeholder.svg"}
                        alt={item.fileName}
                        className="rounded-lg shadow-md w-[200px] h-[150px] object-cover cursor-pointer transition-transform duration-200 ease-in-out group-hover:scale-105"
                        onClick={() => {
                          setSelectedNote(notes?.notes);
                          setCurrentImageIndex(index);
                        }}
                      />
                      <div>
                        <Button
                          title="Download Pdf"
                          variant="outline"
                          className="absolute bottom-1 left-2 flex items-center justify-center p-2 rounded-full bg-white hover:bg-blue-100 cursor-pointer shadow-md"
                          onClick={() =>
                            handleDownload(item?.url, notes?.createdAt, index)
                          }
                        >
                          <Download className="text-gray-600 w-5 h-5" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                        Page {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}

        {selectedNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevImage}
                  className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-gray-800 rounded-full shadow-md"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextImage}
                  className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-gray-800 rounded-full shadow-md"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                <div
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "top left",
                  }}
                  className="transition-transform duration-200 ease-in-out"
                >
                  <div className="mb-4 flex justify-center space-x-2">
                    <Button onClick={zoomIn} size="sm">
                      <ZoomIn className="h-4 w-4 mr-1" /> Zoom In
                    </Button>
                    <Button onClick={zoomOut} size="sm">
                      <ZoomOut className="h-4 w-4 mr-1" /> Zoom Out
                    </Button>
                    <Button onClick={resetZoom} size="sm">
                      <RotateCcw className="h-4 w-4 mr-1" /> Reset
                    </Button>
                    <Button onClick={() => setSelectedNote(null)} size="sm">
                      Close
                    </Button>
                  </div>
                  <div className="my-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Page {currentImageIndex + 1} of {selectedNote?.length}
                  </div>
                  <img
                    src={selectedNote[currentImageIndex]?.url}
                    alt={`Note ${subject.chapterName}`}
                    className="rounded-lg w-[800px] h-[600px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListDailyNotes;
