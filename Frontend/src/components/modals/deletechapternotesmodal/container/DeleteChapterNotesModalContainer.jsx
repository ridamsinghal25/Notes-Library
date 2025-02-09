import { useState } from "react";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import DeleteChapterNotesModal from "../presentation/DeleteChapterNotesModal";
import DailyNotesService from "@/services/DailyNotesService";
import { resetDailyNotesState } from "@/store/DailyNotesSlice";

function DeleteChapterNotesModalContainer() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentSubjectChapters, setCurrentSubjectChapters] = useState([]);

  const showDeleteChapterNotesModal = useSelector(
    (state) => state.modal.modals.deleteChapterNotesModal
  );

  const userSubjects = useSelector(
    (state) => state.auth.userDetails?.course?.subjects
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggelDeleteChapterNotesModal = () => {
    dispatch(toggleModal({ modalType: "deleteChapterNotesModal" }));
  };

  const onDeleteHandler = async (data) => {
    setIsDeleting(true);

    const response = await DailyNotesService.deleteChapter(data);

    setIsDeleting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes deleted successfully");

      toggelDeleteChapterNotesModal();
      dispatch(resetDailyNotesState());
      navigate(`${ROUTES.DAILY_NOTES.replace(":subject", data.subject)}`);
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );

      toggelDeleteChapterNotesModal();
    }
  };

  const getSubjectChapters = (subject) => {
    const currentSubject = userSubjects.find(
      (sub) => sub.subjectName === subject
    );

    setCurrentSubjectChapters(currentSubject.chapters);
  };

  return (
    <DeleteChapterNotesModal
      showDialog={showDeleteChapterNotesModal}
      setShowDialog={toggelDeleteChapterNotesModal}
      isDeleting={isDeleting}
      onSubmit={onDeleteHandler}
      userSubjects={userSubjects}
      getSubjectChapters={getSubjectChapters}
      currentSubjectChapters={currentSubjectChapters}
    />
  );
}

export default DeleteChapterNotesModalContainer;
