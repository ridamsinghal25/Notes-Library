import PDFCard, { withActionButtons } from "@/components/PdfCard";
import { Separator } from "@/components/ui/separator";
import { CircleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNotes } from "@/store/NotesSlice";
import UploadNotes from "@/components/modals/UploadNotes";
import { USER_ROLE } from "@/constants/constants";
import DeleteNotes from "@/components/modals/DeleteNotes";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";

function NotesSubjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUploadNotesModal, setShowUploadNotesModal] = useState(false);
  const [showDeleteNotesModal, setShowDeleteNotesModal] = useState(false);
  const [notesInfo, setNotesInfo] = useState(null);
  const subject = useParams();
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.notes.userNotes);
  const notesError = useSelector((state) => state.notes.error);
  const userInfo = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    dispatch(fetchNotes(subject));
  }, [dispatch, subject]);

  const toggleDeleteModal = (notes) => {
    setShowDeleteNotesModal(!showDeleteNotesModal);
    setNotesInfo(notes);
  };

  const toggleUpdateModal = (notes) => {
    setShowUploadNotesModal(!showUploadNotesModal);
    setNotesInfo(notes);
  };

  const NotesCardWithButtons = withActionButtons(PDFCard);

  const onNotesUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotes(notesInfo._id, data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message, {
        autoClose: 2000,
      });

      setTimeout(() => window.location.reload(), 2000);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }

    setShowUploadNotesModal(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Notes for the {subject.subject}
      </h1>

      <div className="flex flex-col items-center sm:block">
        {notesData.length > 0 ? (
          notesData?.map((notes) => (
            <div key={notes._id} className="mb-8 sm:ml-8">
              <div className="flex items-center mb-4 flex-col sm:flex-row justify-center sm:justify-normal">
                <div className="bg-violet-600 text-white font-bold py-2 px-4 rounded-lg mr-4">
                  Unit {notes.chapterNumber}
                </div>
                <h2 className="text-2xl mt-3 text-center font-semibold underline">
                  {notes.chapterName}
                </h2>
              </div>
              <Separator />
              <div>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex justify-between items-start gap-4 w-full max-w-4xl">
                      <div className="flex-1">
                        {userInfo?.role === USER_ROLE.ADMIN &&
                        userInfo?._id === notes?.createdBy ? (
                          <NotesCardWithButtons
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
                        {showUploadNotesModal && (
                          <UploadNotes
                            showDialog={showUploadNotesModal}
                            setShowDialog={setShowUploadNotesModal}
                            title={"Update"}
                            notesInfo={notesInfo}
                            onSubmit={onNotesUpdate}
                            isSubmitting={isSubmitting}
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
