import { CircleAlert, FileText, Trash } from "lucide-react";
import NotesSubjectPageSkeleton from "@/components/basic/NotesSubjectPageSkeleton";
import PDFCardContainer from "@/components/pageComponent/PdfCard/container/PdfCardContainer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DeleteModalContainer from "@/components/modals/deletemodal/container/DeleteModalContainer";
import { Button } from "@/components/ui/button";
import DeleteSubjectNotesModalContainer from "@/components/modals/deletesubjectnotesmodal/container/DeleteSubjectNotesModalContainer";
import { UserRolesEnum } from "@/constants/constants";

function NotesSubjectPage({
  subject,
  notesData,
  toggleDeleteSubjectModal,
  userRole,
  onDeleteHandler,
  isDeleting,
}) {
  if (notesData?.status === "loading") {
    return <NotesSubjectPageSkeleton isCard={false} />;
  }

  const userNotes = notesData?.userNotes;

  return (
    <div className="min-h-screen relative ">
      <div className="container mx-auto py-8 px-4 relative z-10">
        <HelmetProvider>
          <Helmet>
            <title>{subject.subject} Notes</title>
            <meta charset="UTF-8" />
            <meta name="description" content={`Notes for ${subject.subject}`} />
          </Helmet>
        </HelmetProvider>

        {userRole === UserRolesEnum.ADMIN && (
          <div className="fixed top-4 right-4 z-50">
            <Button onClick={toggleDeleteSubjectModal}>
              <Trash className="h-5 w-5 relative z-10" />
            </Button>
          </div>
        )}

        <div className="max-w-5xl mx-auto transition-all duration-1000">
          <div className="relative mb-16 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent drop-shadow-sm">
              Notes for {subject.subject}
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"></div>
          </div>

          <div className="flex flex-col items-center">
            {userNotes && userNotes.length > 0 ? (
              <div className="w-full space-y-16">
                {userNotes.map((notes, noteIndex) => (
                  <div
                    key={notes?.chapterNumber}
                    className={`transition-all duration-1000 delay-${
                      noteIndex * 200
                    }`}
                  >
                    <div className="p-6">
                      <div className="relative group cursor-pointer overflow-hidden bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 mb-6 border border-gray-100/80 dark:border-gray-700/80">
                        {/* Background gradient that intensifies on hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                        <div className="relative p-4 sm:p-6">
                          <div className="flex items-center gap-3 sm:gap-5">
                            {/* Chapter number with enhanced animations */}
                            <div className="relative flex-shrink-0 group/number">
                              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-violet-600 to-purple-600 text-white text-lg sm:text-xl font-bold rounded-lg shadow-md transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
                                {notes?.chapterNumber || "1"}
                                {/* Animated dot indicator */}
                                <span className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-white dark:bg-gray-200 rounded-full opacity-70 animate-ping"></span>
                              </div>
                              {/* Glow effect on hover */}
                              <div className="absolute inset-0 bg-violet-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></div>
                            </div>

                            {/* Content container with improved layout */}
                            <div className="flex-grow flex flex-col">
                              {/* Chapter title with better truncation handling */}
                              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors duration-300">
                                {notes?.chapterName || "Chapter Title"}
                              </h2>

                              {/* Info row with improved spacing and placement */}
                              <div className="mt-2 flex items-center flex-wrap gap-3">
                                {/* Document count with icon */}
                                <div className="flex items-center gap-2">
                                  <div className="bg-violet-100 dark:bg-violet-900/30 rounded-full p-1.5 sm:p-2 shadow-sm group-hover:bg-violet-200 dark:group-hover:bg-violet-800/50 transition-colors duration-300">
                                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 dark:text-violet-400" />
                                  </div>
                                  <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                                    {notes?.notes?.length || 0} Document
                                    {notes?.notes?.length !== 1 ? "s" : ""}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Progress indicator (optional feature) */}
                        <div className="h-1 w-full bg-gray-100 dark:bg-gray-700/50 mt-auto">
                          <div
                            className="h-full bg-gradient-to-r from-violet-600 to-purple-500 transition-all duration-700 group-hover:from-violet-500 group-hover:to-fuchsia-500"
                            style={{ width: "65%" }}
                          ></div>
                        </div>

                        {/* Mobile touch feedback */}
                        <div className="absolute inset-0 bg-violet-600/10 opacity-0 active:opacity-100 sm:hidden transition-opacity duration-150"></div>
                      </div>

                      <div className="mt-8">
                        <PDFCardContainer notes={notes} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full max-w-2xl mx-auto">
                <div className="relative overflow-hidden p-8 text-base  backdrop-blur-sm border border-violet-200 dark:border-violet-800/30 rounded-xl shadow-xl gap-4 animate-fade-in flex flex-col items-center">
                  {/* Decorative elements */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-violet-200 dark:bg-violet-800/20 rounded-full blur-xl opacity-70"></div>
                  <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-purple-200 dark:bg-purple-800/20 rounded-full blur-xl opacity-70"></div>

                  <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-2">
                    <CircleAlert className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
                    No Notes Found
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                    {notesData?.error ||
                      "We couldn't find any notes for this subject. Check back later or try another subject."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <DeleteModalContainer
          onDeleteHandler={onDeleteHandler}
          isDeleting={isDeleting}
        />

        <DeleteSubjectNotesModalContainer />

        <footer className="text-center text-gray-500 mt-24 pb-8 dark:text-gray-400 relative z-10">
          <div className="relative h-px w-48 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
          </div>
          &copy; {new Date().getFullYear()} {subject.subject} Notes. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
}

export default NotesSubjectPage;
