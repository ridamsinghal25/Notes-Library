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
                      <div className="relative group overflow-hidden bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-[1.01] mb-8 border border-gray-100/80 dark:border-gray-700/80">
                        <div className="p-6">
                          <div className="flex flex-row items-start gap-6">
                            {/* Chapter number with animated background */}
                            <div className="relative group/number">
                              <div className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-violet-600 to-purple-600 text-white text-base sm:text-xl font-bold rounded-lg shadow-md transform transition-all duration-500 group-hover/number:shadow-lg group-hover/number:shadow-violet-500/30 dark:group-hover/number:shadow-violet-700/40">
                                {notes?.chapterNumber}
                                <span className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-white dark:bg-gray-200 rounded-full opacity-70 animate-ping"></span>
                              </div>
                            </div>

                            {/* Chapter details */}
                            <div className="flex flex-col flex-grow">
                              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors duration-300">
                                {notes?.chapterName}
                              </h2>

                              <div className="flex items-center space-x-3 mt-3 text-gray-600 dark:text-gray-400">
                                <div className="bg-violet-100 dark:bg-violet-900/30 rounded-full p-2 shadow-sm">
                                  <FileText className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                                </div>
                                <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                  {notes?.notes?.length} Document
                                  {notes?.notes?.length !== 1 ? "s" : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
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
