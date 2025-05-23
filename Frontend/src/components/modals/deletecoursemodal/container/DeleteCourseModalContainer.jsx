import { useState } from "react";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse, toggleModal } from "@/store/ModalSlice";
import CourseService from "@/services/CourseService";
import { deleteCourse } from "@/store/CourseSlice";
import DeleteCourseModal from "../presentation/DeleteCourseModal";

function DeleteCourseModalContainer() {
  const [isDeleting, setIsDeleting] = useState(false);
  const showDeleteCourseModal = useSelector(
    (state) => state.modal.modals.deleteCourseModal
  );

  const selectedCourseId = useSelector((state) => state.modal.selectedCourseId);
  const dispatch = useDispatch();

  const onDeleteHandler = async (data) => {
    setIsDeleting(true);

    let response = await CourseService.deleteCourse(selectedCourseId, data);

    setIsDeleting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes deleted successfully");

      dispatch(deleteCourse(selectedCourseId));
      dispatch(setSelectedCourse(null));

      toggelDeleteCourseModal();
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const toggelDeleteCourseModal = () => {
    dispatch(toggleModal({ modalType: "deleteCourseModal" }));
    dispatch(setSelectedCourse(null));
  };

  return (
    <DeleteCourseModal
      showDialog={showDeleteCourseModal}
      setShowDialog={toggelDeleteCourseModal}
      isDeleting={isDeleting}
      onSubmit={onDeleteHandler}
    />
  );
}

export default DeleteCourseModalContainer;
