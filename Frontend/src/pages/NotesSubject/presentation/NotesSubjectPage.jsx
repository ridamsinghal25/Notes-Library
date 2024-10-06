import { CircleAlert } from "lucide-react";
import React from "react";
import SkeletonUI from "@/components/basic/Skeleton";
import PDFCardContainer from "@/components/pageComponent/PdfCard/container/PdfCardContainer";

function NotesSubjectPage({ subject, notesData }) {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-200">
        Notes for the {subject.subject}
      </h1>

      <div className="flex flex-col items-center sm:block">
        {notesData?.status === "loading" ? (
          <SkeletonUI isCard={true} />
        ) : notesData?.userNotes?.length > 0 ? (
          notesData?.userNotes?.map((notes) => (
            <div key={notes._id} className="mb-8 sm:ml-8">
              <div className="flex items-center mb-4 flex-col sm:flex-row justify-center sm:justify-normal">
                <div className="bg-violet-600 text-white font-bold py-2 px-4 rounded-lg mr-4 dark:text-gray-200">
                  Unit {notes.chapterNumber}
                </div>
                <h2 className="text-2xl mt-3 text-center font-semibold underline dark:text-gray-200">
                  {notes.chapterName}
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
            className="flex items-center p-4 mb-4 text-sm text-red-700 dark:text-white dark:font-semibold bg-red-100 dark:bg-red-500 border border-red-300 rounded-lg gap-2"
            role="alert"
          >
            <CircleAlert /> <span>{notesData?.error}</span>
          </div>
        )}
      </div>

      <footer className="text-center text-gray-500 mt-8 dark:text-gray-200">
        &copy; {new Date().getFullYear()} {subject.subject} Notes. All rights
        reserved.
      </footer>
    </div>
  );
}

export default NotesSubjectPage;
