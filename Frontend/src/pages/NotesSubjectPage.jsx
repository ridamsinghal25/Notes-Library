import PDFCard from "@/components/PdfCard";
import { Separator } from "@/components/ui/separator";
import { FilePen, Trash2Icon } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchNotes } from "@/store/NotesSlice";

function NotesSubjectPage() {
  const subject = useParams();
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.notes.userNotes);
  const notesError = useSelector((state) => state.notes.error);

  useEffect(() => {
    dispatch(fetchNotes(subject));
  }, [dispatch, subject]);

  useEffect(() => {
    if (notesError) {
      toast.error(notesError || "Failed to fetch notes");
    }
  }, [notesError]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Notes for the {subject.subject}
      </h1>

      <div className="flex flex-col items-center sm:block">
        {notesData?.map((notes) => (
          <div key={notes._id} className="mb-8 ml-8">
            <div className="flex items-center mb-4 flex-col sm:flex-row justify-center sm:justify-normal">
              <div className="bg-violet-600 text-white font-bold py-2 px-4 rounded-lg mr-4">
                Unit {notes.chapterNumber}
              </div>
              <h2 className="text-2xl font-semibold underline">
                {notes.chapterName}
              </h2>
            </div>
            <Separator />
            <div>
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex justify-between items-start gap-4 w-full max-w-4xl">
                    <div className="flex-1">
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
                </div>
                <div className="flex items-center gap-4 mt-5 mr-5">
                  <div className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 cursor-pointer">
                    <FilePen className="text-gray-600" />
                  </div>
                  <div className="bg-red-200 p-2 rounded-full hover:bg-red-300 cursor-pointer">
                    <Trash2Icon className="text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="text-center text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} {subject.subject} Notes. All rights
        reserved.
      </footer>
    </div>
  );
}

export default NotesSubjectPage;
