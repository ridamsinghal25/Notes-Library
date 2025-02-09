import { useSelector } from "react-redux";
import { useState } from "react";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import UploadNotes from "../presentation/UploadNotes";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";

function UploadNotesContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSubjectChapters, setCurrentSubjectChapters] = useState([]);

  const navigate = useNavigate();

  const userSubjects = useSelector(
    (state) => state.auth.userDetails?.course?.subjects
  );

  const onNotesUpload = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.uploadNotes(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      navigate(ROUTES.NOTES);
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const getSubjectChapters = (subject) => {
    const currentSubject = userSubjects.find(
      (sub) => sub.subjectName === subject
    );

    setCurrentSubjectChapters(currentSubject.chapters);
  };

  return (
    <UploadNotes
      userSubjects={userSubjects}
      isSubmitting={isSubmitting}
      onSubmit={onNotesUpload}
      getSubjectChapters={getSubjectChapters}
      currentSubjectChapters={currentSubjectChapters}
    />
  );
}

export default UploadNotesContainer;
