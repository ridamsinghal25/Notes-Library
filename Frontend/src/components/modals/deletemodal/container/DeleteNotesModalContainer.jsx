import { useState } from "react";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import DeleteNotesModal from "../presentation/DeleteNotesModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";

function DeleteNotesModalContainer({ showDialog, setShowDialog, notesId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const showDeleteModal = useSelector(
    (state) => state.modal.modals.deleteNotesModal
  );
  const dispatch = useDispatch();

  const toggelDeleteModal = () => {
    dispatch(toggleModal({ modalType: "deleteNotesModal" }));
  };

  const onDeleteNotesHandler = async () => {
    setIsDeleting(true);

    const response = await NotesService.deleteNotes(notesId);

    setIsDeleting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes deleted successfully");

      toggelDeleteModal();

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <DeleteNotesModal
      showDialog={showDeleteModal}
      setShowDialog={toggelDeleteModal}
      isDeleting={isDeleting}
      onDeleteNotesHandler={onDeleteNotesHandler}
    />
  );
}

export default DeleteNotesModalContainer;
