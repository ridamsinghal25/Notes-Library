import { useDispatch, useSelector } from "react-redux";
import NotesModal from "../presentation/NotesModal";
import { useState } from "react";

function NotesModalContainer({ isUpdateMode = false, notesInfo }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const showNotesModal = useSelector((state) => state.modal.modals.notesModal);
  const userSubjects = useSelector((state) => state.auth.userDetails);

  const toggleNotesModal = () => {
    dispatch(toggleModal({ modalType: "notesModal" }));
  };

  const onNotesUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotes(initialNotes?._id, data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      toggleNotesModal();

      setTimeout(() => window.location.reload(), 2000);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const onNotesUpload = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.uploadNotes(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      toggleNotesModal();
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };
  return (
    <>
      {isUpdateMode ? (
        <NotesModal
          userSubjects={userSubjects}
          notesInfo={notesInfo}
          showDialog={showNotesModal}
          setShowDialog={toggleNotesModal}
          isUpdateMode={isUpdateMode}
          isSubmitting={isSubmitting}
          onSubmit={onNotesUpdate}
        />
      ) : (
        <NotesModal
          userSubjects={userSubjects}
          notesInfo={notesInfo}
          showDialog={showNotesModal}
          setShowDialog={toggleNotesModal}
          isUpdateMode={isUpdateMode}
          isSubmitting={isSubmitting}
          onSubmit={onNotesUpload}
        />
      )}
    </>
  );
}

export default NotesModalContainer;
