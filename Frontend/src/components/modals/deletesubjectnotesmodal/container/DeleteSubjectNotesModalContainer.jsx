import { useState } from "react";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";
import DeleteSubjectNotesModal from "../presentation/DeleteSubjectNotesModal";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { resetNotesState } from "@/store/NotesSlice";

function DeleteSubjectNotesModalContainer() {
  const [isDeleting, setIsDeleting] = useState(false);
  const showDeleteSubjectNotesModal = useSelector(
    (state) => state.modal.modals.deleteSubjectNotesModal
  );
  const userSubjects = useSelector((state) =>
    state.auth.userDetails?.course?.subjects?.map(
      (subject) => subject.subjectName
    )
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggelDeleteSubjectNotesModal = () => {
    dispatch(toggleModal({ modalType: "deleteSubjectNotesModal" }));
  };

  const onDeleteHandler = async (data) => {
    setIsDeleting(true);

    const response = await NotesService.deleteSubjectNotes(data);

    setIsDeleting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes deleted successfully");

      toggelDeleteSubjectNotesModal();
      dispatch(resetNotesState());
      navigate(`${ROUTES.NOTES}`);
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  return (
    <DeleteSubjectNotesModal
      showDialog={showDeleteSubjectNotesModal}
      setShowDialog={toggelDeleteSubjectNotesModal}
      isDeleting={isDeleting}
      onSubmit={onDeleteHandler}
      userSubjects={userSubjects}
    />
  );
}

export default DeleteSubjectNotesModalContainer;
