import { useDispatch, useSelector } from "react-redux";
import NotesModal from "../presentation/NotesModal";
import { useState } from "react";
import NotesService from "@/services/NotesService";
import { setSelectedNotes, toggleModal } from "@/store/ModalSlice";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";

function NotesModalContainer({ isUpdateMode = false }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const showNotesModal = useSelector((state) => state.modal.modals.notesModal);
  const selectedNotes = useSelector((state) => state.modal.selectedNotes);
  const userSubjects = useSelector(
    (state) => state.auth.userDetails?.course?.subjects
  );

  const toggleNotesModal = () => {
    dispatch(toggleModal({ modalType: "notesModal" }));
    dispatch(setSelectedNotes({}));
  };

  const onNotesUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotes(selectedNotes?._id, data);

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
          notesInfo={selectedNotes}
          showDialog={showNotesModal}
          setShowDialog={toggleNotesModal}
          isUpdateMode={isUpdateMode}
          isSubmitting={isSubmitting}
          onSubmit={onNotesUpdate}
        />
      ) : (
        <NotesModal
          userSubjects={userSubjects}
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
