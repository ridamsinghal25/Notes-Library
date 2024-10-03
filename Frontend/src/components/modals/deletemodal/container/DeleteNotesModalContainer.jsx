import { useState } from "react";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import DeleteNotesModal from "../presentation/DeleteNotesModal";

function DeleteNotesModalContainer({ showDialog, setShowDialog, notesId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteNotesHandler = async () => {
    setIsDeleting(true);

    const response = await NotesService.deleteNotes(notesId);

    setIsDeleting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes deleted successfully");

      setShowDialog();

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <DeleteNotesModal
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      isDeleting={isDeleting}
      onDeleteNotesHandler={onDeleteNotesHandler}
    />
  );
}

export default DeleteNotesModalContainer;
