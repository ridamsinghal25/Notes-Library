import PDFCard from "@/components/PdfCard";
import { Separator } from "@/components/ui/separator";
import ApiError from "@/services/ApiError";
import NotesService from "@/services/NotesService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function NotesSubjectPage() {
  const subject = useParams();
  const [notesData, setNotesData] = useState();

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await NotesService.getNotesBySubject(subject);

      if (!(response instanceof ApiError)) {
        toast.success(response?.message || "Notes fetched successfully");

        setNotesData(response?.data);
      } else {
        toast.error(response?.errorResponse?.message || response?.errorMessage);
      }
    };

    fetchNotes();
  }, [subject]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Notes for the {subject.subject}
      </h1>

      {notesData?.map((notes) => (
        <div key={notes._id} className="mb-8 ml-8">
          <div className="flex items-center mb-4">
            <div className="bg-violet-600 text-white font-bold py-2 px-4 rounded-lg mr-4">
              Unit {notes.chapterNumber}
            </div>
            <h2 className="text-2xl font-semibold underline">
              {notes.chapterName}
            </h2>
          </div>
          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
            <PDFCard
              pdfUrl={notes.pdf?.url}
              owner={notes.owner}
              chapterName={notes.chapterName}
              isLiked={notes.isLiked}
              likesCount={notes.likesCount}
              notesId={notes._id}
            />
          </div>
        </div>
      ))}
      <footer className="text-center text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} {subject.subject} Notes. All rights
        reserved.
      </footer>
    </div>
  );
}

export default NotesSubjectPage;
