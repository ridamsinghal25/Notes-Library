import { useState } from "react";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import DeleteModal from "../presentation/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNotes, toggleModal } from "@/store/ModalSlice";
import { deleteNotes } from "@/store/NotesSlice";

function DeleteModalContainer() {
  const [isDeleting, setIsDeleting] = useState(false);
  const showDeleteModal = useSelector(
    (state) => state.modal.modals.deleteModal
  );
  const selectedNotes = useSelector((state) => state.modal.selectedNotes);
  const dispatch = useDispatch();

  const toggelDeleteModal = () => {
    dispatch(toggleModal({ modalType: "deleteModal" }));
    dispatch(setSelectedNotes({}));
  };

  const onDeleteHandler = async () => {
    setIsDeleting(true);
    const response = await NotesService.deleteNotes(selectedNotes?._id);

    setIsDeleting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes deleted successfully");

      dispatch(deleteNotes(selectedNotes?._id));

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
    <DeleteModal
      showDialog={showDeleteModal}
      setShowDialog={toggelDeleteModal}
      isDeleting={isDeleting}
      onDeleteHandler={onDeleteHandler}
    />
  );
}

export default DeleteModalContainer;
