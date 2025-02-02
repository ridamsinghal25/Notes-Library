import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
} from "lucide-react";
import { getDayOfWeek } from "@/utils/getDayOfWeek";
import { Helmet, HelmetProvider } from "react-helmet-async";

function ListDailyNotes({
  zoomLevel,
  selectedNote,
  setSelectedNote,
  currentImageIndex,
  setCurrentImageIndex,
  subject,
  zoomIn,
  zoomOut,
  resetZoom,
  handlePrevImage,
  handleNextImage,
  sampleNotes,
}) {
  return (
    <div className="min-h-screen p-4 md:p-8 transition-colors duration-200 ">
      <HelmetProvider>
        <Helmet>
          <title>List Notes</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a list daily notes page" />
        </Helmet>
      </HelmetProvider>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        Notes for {subject.subject}
      </h1>
      <div className="flex items-center mb-4 flex-col sm:flex-row justify-center sm:justify-normal">
        <div className="bg-violet-600 text-white font-bold py-2 px-4 rounded-lg mr-4 dark:bg-violet-700">
          Unit {subject.chapterNumber}
        </div>
        <h2 className="text-2xl mt-3 sm:mt-0 text-center font-semibold underline text-gray-800 dark:text-gray-200">
          {subject.chapterName}
        </h2>
      </div>
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          My Image Notes
        </h3>

        {sampleNotes.map((notes) => (
          <div key={notes.id} className="mb-8">
            <div className="flex items-center mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex-shrink-0 mr-4">
                <CalendarIcon className="w-8 h-8 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {notes.date}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {notes.src.length} page{notes.src.length > 1 ? "s" : ""} of
                  notes
                </p>
              </div>
              <div className="ml-auto">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800 dark:bg-violet-700 dark:text-violet-100">
                  {getDayOfWeek(notes.date)}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-start gap-4 p-4">
              {notes.src.map((src, index) => (
                <div key={index} className="relative group">
                  <img
                    src={src || "/placeholder.svg"}
                    alt={`${notes.alt} - Page ${index + 1}`}
                    className="rounded-lg shadow-md w-[200px] h-[150px] object-cover cursor-pointer transition-transform duration-200 ease-in-out group-hover:scale-105"
                    onClick={() => {
                      setSelectedNote(notes.src);
                      setCurrentImageIndex(index);
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                    Page {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

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
                    src={selectedNote[currentImageIndex]}
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
