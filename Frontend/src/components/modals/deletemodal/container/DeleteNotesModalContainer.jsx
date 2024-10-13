import { useState } from "react";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import DeleteNotesModal from "../presentation/DeleteNotesModal";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNotes, toggleModal } from "@/store/ModalSlice";
import { deleteNotes } from "@/store/NotesSlice";

function DeleteNotesModalContainer() {
  const [isDeleting, setIsDeleting] = useState(false);
  const showDeleteModal = useSelector(
    (state) => state.modal.modals.deleteNotesModal
  );
  const selectedNotes = useSelector((state) => state.modal.selectedNotes);
  const dispatch = useDispatch();

  const toggelDeleteModal = () => {
    dispatch(toggleModal({ modalType: "deleteNotesModal" }));
    dispatch(setSelectedNotes({}));
  };

  const onDeleteNotesHandler = async () => {
    setIsDeleting(true);

    const response = await NotesService.deleteNotes(selectedNotes?._id);

    setIsDeleting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes deleted successfully");

      toggelDeleteModal();

      dispatch(deleteNotes(selectedNotes?._id));
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
