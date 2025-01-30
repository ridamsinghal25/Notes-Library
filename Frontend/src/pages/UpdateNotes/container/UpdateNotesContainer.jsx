import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { updateNotesState } from "@/store/NotesSlice";
import UpdateNotes from "../presentation/UpdateNotes";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";

function UpdateNotesContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedNotes?._id) navigate(ROUTES.NOTES);
  }, []);

  const selectedNotes = useSelector((state) => state.modal.selectedNotes);
  const userSubjects = useSelector((state) =>
    state.auth.userDetails?.course?.subjects?.map(
      (subject) => subject.subjectName
    )
  );

  const onNotesUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotes(selectedNotes?._id, data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      dispatch(
        updateNotesState({
          noteId: selectedNotes?._id,
          newNotes: response?.data,
        })
      );

      toast.success(response?.message);
      navigate(ROUTES.NOTES);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  const onPdfFileUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotesPdfFile(
      selectedNotes?._id,
      data?.pdfFile
    );

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      dispatch(
        updateNotesState({
          noteId: selectedNotes?._id,
          newNotes: response?.data,
        })
      );

      toast.success(response?.message);
      navigate(ROUTES.NOTES);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <UpdateNotes
      userSubjects={userSubjects}
      selectedNotes={selectedNotes}
      isSubmitting={isSubmitting}
      onNotesUpdate={onNotesUpdate}
      onPdfFileUpdate={onPdfFileUpdate}
      navigate={navigate}
    />
  );
}

export default UpdateNotesContainer;
