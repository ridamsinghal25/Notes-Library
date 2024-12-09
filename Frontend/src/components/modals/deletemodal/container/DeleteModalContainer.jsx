import { useState } from "react";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import DeleteModal from "../presentation/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNotes, toggleModal } from "@/store/ModalSlice";
import { deleteNotes } from "@/store/NotesSlice";
import CourseService from "@/services/CourseService";
import { deleteCourse } from "@/store/CourseSlice";

function DeleteModalContainer() {
  const [isDeleting, setIsDeleting] = useState(false);
  const showDeleteModal = useSelector(
    (state) => state.modal.modals.deleteModal
  );
  const selectedNotes = useSelector((state) => state.modal.selectedNotes);
  const selectedCourse = useSelector((state) => state.modal.selectedCourse);
  const dispatch = useDispatch();

  const toggelDeleteModal = () => {
    dispatch(toggleModal({ modalType: "deleteModal" }));
    dispatch(setSelectedNotes({}));
  };

  const onDeleteHandler = async () => {
    setIsDeleting(true);
    let response;

    if (selectedNotes?._id) {
      response = await NotesService.deleteNotes(selectedNotes?._id);
    } else if (selectedCourse?._id) {
      response = await CourseService.deleteCourse(selectedCourse?._id);
    } else {
      toast.error("Something went wrong");
      return;
    }

    setIsDeleting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes deleted successfully");

      toggelDeleteModal();

      if (selectedNotes?._id) {
        dispatch(deleteNotes(selectedNotes?._id));
      } else if (selectedCourse?._id) {
        dispatch(deleteCourse(selectedCourse?._id));
      }
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
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
