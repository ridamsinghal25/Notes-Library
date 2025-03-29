import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { updateNotesState } from "@/store/NotesSlice";
import UpdateNotes from "../presentation/UpdateNotes";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/route";

function UpdateNotesContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSubjectChapters, setCurrentSubjectChapters] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParmas] = useSearchParams();
  const notesId = searchParmas.get("notesId");

  const userNotes = useSelector((state) =>
    state.notes.userNotes?.find((chap) =>
      chap.notes.some((note) => note._id === notesId)
    )
  );

  useEffect(() => {
    if (!notesId || !userNotes) {
      navigate(ROUTES.NOTES);
    }
  }, [notesId, userNotes]);

  const selectedNotes = useMemo(() => {
    if (!userNotes) return null;

    return {
      ...userNotes,
      notes: userNotes?.notes?.filter((note) => note._id === notesId),
    };
  }, [userNotes, notesId]);

  const userSubjects = useSelector(
    (state) => state.auth.userDetails?.course?.subjects
  );

  const getSubjectChapters = (subject) => {
    const currentSubject = userSubjects.find(
      (sub) => sub.subjectName === subject
    );

    setCurrentSubjectChapters(currentSubject.chapters);
  };

  const onNotesUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotes(
      selectedNotes.notes[0]?._id,
      data
    );

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      dispatch(
        updateNotesState({
          noteId: selectedNotes.notes[0]?._id,
          newNotes: response?.data,
        })
      );

      if (response?.data?.chapterNumber !== selectedNotes.chapterNumber) {
        toast.success(response?.message);
        navigate(ROUTES.NOTES);
        return;
      }

      toast.success(response?.message);
      navigate(-1 || ROUTES.NOTES);
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const onPdfFileUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotesPdfFile(
      selectedNotes.notes[0]?._id,
      data?.pdfFile
    );

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      dispatch(
        updateNotesState({
          noteId: selectedNotes.notes[0]?._id,
          newNotes: response?.data,
        })
      );

      toast.success(response?.message);
      navigate(-1 || ROUTES.NOTES);
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
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
      getSubjectChapters={getSubjectChapters}
      currentSubjectChapters={currentSubjectChapters}
    />
  );
}

export default UpdateNotesContainer;
