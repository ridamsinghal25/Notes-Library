import PDFCard, { withActionButtons } from "@/components/PdfCard";
import { Separator } from "@/components/ui/separator";
import { CircleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNotes } from "@/store/NotesSlice";
import UploadNotes from "@/components/modals/UploadNotes";
import { USER_ROLE } from "@/constants/auth";
import DeleteNotes from "@/components/modals/DeleteNotes";

function NotesSubjectPage() {
  const [showUpdateNotesModal, setShowUpdateNotesModal] = useState(false);
  const [showDeleteNotesModal, setShowDeleteNotesModal] = useState(false);
  const [notesInfo, setNotesInfo] = useState(null);
  const subject = useParams();
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.notes.userNotes);
  const notesError = useSelector((state) => state.notes.error);
  const userRole = useSelector((state) => state.auth.userDetails?.role);

  useEffect(() => {
    dispatch(fetchNotes(subject));
  }, [dispatch, subject]);

  const toggleDeleteModal = (notes) => {
    setShowDeleteNotesModal(!showDeleteNotesModal);
    setNotesInfo(notes);
  };

  const toggleUpdateModal = (notes) => {
    setShowUpdateNotesModal(!showUpdateNotesModal);
    setNotesInfo(notes);
  };

  const RestaurantCardWithButtons = withActionButtons(PDFCard);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Notes for the {subject.subject}
      </h1>

      <div className="flex flex-col items-center sm:block">
        {notesData.length > 0 ? (
          notesData?.map((notes) => (
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
                        {userRole === USER_ROLE.ADMIN ? (
                          <RestaurantCardWithButtons
                            notes={notes}
                            updateButtonHandler={(notes) =>
                              toggleUpdateModal(notes)
                            }
                            deleteButtonHandler={(notes) => {
                              toggleDeleteModal(notes);
                            }}
                          />
                        ) : (
                          <PDFCard notes={notes} />
                        )}
                        {showUpdateNotesModal && (
                          <UploadNotes
                            showDialog={showUpdateNotesModal}
                            setShowDialog={setShowUpdateNotesModal}
                            title={"Update"}
                            notesInfo={notesInfo}
                          />
                        )}
                        {showDeleteNotesModal && (
                          <DeleteNotes
                            showDialog={showDeleteNotesModal}
                            setShowDialog={setShowDeleteNotesModal}
                            notesId={notesInfo?._id}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg gap-2"
            role="alert"
          >
            <CircleAlert /> <span>{notesError}</span>
          </div>
        )}
      </div>

      <footer className="text-center text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} {subject.subject} Notes. All rights
        reserved.
      </footer>
    </div>
  );
}

export default NotesSubjectPage;
