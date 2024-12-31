import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNotes } from "@/store/NotesSlice";
import NotesSubjectPage from "../presentation/NotesSubjectPage";
import { toggleModal } from "@/store/ModalSlice";

function NotesSubjectPageContainer() {
  const subject = useParams();
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.notes);
  const userRole = useSelector((state) => state.auth.userDetails?.role);

  useEffect(() => {
    dispatch(fetchNotes(subject));
  }, [dispatch, subject]);

  const toggleDeleteSubjectModal = () => {
    dispatch(toggleModal({ modalType: "deleteSubjectNotesModal" }));
  };

  return (
    <NotesSubjectPage
      subject={subject}
      notesData={notesData}
      userRole={userRole}
      toggleDeleteSubjectModal={toggleDeleteSubjectModal}
    />
  );
}

export default NotesSubjectPageContainer;
