import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteNotes, fetchNotes } from "@/store/NotesSlice";
import NotesSubjectPage from "../presentation/NotesSubjectPage";
import { setSelectedNotes, toggleModal } from "@/store/ModalSlice";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";

function NotesSubjectPageContainer() {
  const subject = useParams();
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.notes);
  const userRole = useSelector((state) => state.auth.userDetails?.role);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchNotes(subject));
  }, [dispatch, subject]);

  const selectedNotesId = useSelector((state) => state.modal.selectedNotesId);

  const toggleDeleteSubjectModal = () => {
    dispatch(toggleModal({ modalType: "deleteSubjectNotesModal" }));
  };

  const toggelDeleteModal = () => {
    dispatch(toggleModal({ modalType: "deleteModal" }));
    dispatch(setSelectedNotes(null));
  };

  const onDeleteHandler = async () => {
    setIsDeleting(true);
    const response = await NotesService.deleteNotes(selectedNotesId);

    setIsDeleting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes deleted successfully");

      dispatch(deleteNotes(selectedNotesId));

      toggelDeleteModal();
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  return (
    <NotesSubjectPage
      subject={subject}
      notesData={notesData}
      userRole={userRole}
      toggleDeleteSubjectModal={toggleDeleteSubjectModal}
      onDeleteHandler={onDeleteHandler}
      isDeleting={isDeleting}
    />
  );
}

export default NotesSubjectPageContainer;
