import { CircleAlert, Trash } from "lucide-react";
import React from "react";
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
    <div className="container mx-auto py-8 px-4">
      <HelmetProvider>
        <Helmet>
          <title>Notes Subject</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a notes subject page" />
        </Helmet>
      </HelmetProvider>
      {userRole === UserRolesEnum.ADMIN && (
        <div className="absolute top-4 right-4 z-10">
          <Button onClick={toggleDeleteSubjectModal}>
            <Trash />
          </Button>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-200">
        Notes for the {subject.subject}
      </h1>

      <div className="flex flex-col items-center sm:block">
        {userNotes.length > 0 ? (
          userNotes.map((notes) => (
            <div key={notes?.chapterNumber} className="mb-8 sm:ml-8">
              <div className="flex items-center mb-4 flex-col sm:flex-row justify-center sm:justify-normal">
                <div className="bg-violet-600 text-white font-bold py-2 px-4 rounded-lg mr-4 dark:text-gray-200">
                  Unit {notes?.chapterNumber}
                </div>
                <h2 className="text-2xl mt-3 text-center font-semibold underline dark:text-gray-200">
                  {notes?.chapterName}
                </h2>
              </div>
              <div className="border-b-2 lg:border-r-2 dark:border-gray-400"></div>
              <div>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex justify-between items-start gap-4 w-full max-w-4xl">
                      <div className="flex-1">
                        <PDFCardContainer notes={notes} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="flex items-center p-4 mb-4 text-sm text-green-700 dark:text-white dark:font-semibold bg-green-100 dark:bg-green-500 border border-green-300 rounded-lg gap-2"
            role="alert"
          >
            <CircleAlert /> <span>{notesData?.error || "No notes found"}</span>
          </div>
        )}
      </div>

      <DeleteModalContainer
        onDeleteHandler={onDeleteHandler}
        isDeleting={isDeleting}
      />

      <DeleteSubjectNotesModalContainer />

      <footer className="text-center text-gray-500 mt-8 dark:text-gray-200">
        &copy; {new Date().getFullYear()} {subject.subject} Notes. All rights
        reserved.
      </footer>
    </div>
  );
}

export default NotesSubjectPage;
