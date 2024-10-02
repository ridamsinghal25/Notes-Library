import { useState } from "react";
import { useSelector } from "react-redux";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import NotesPage from "../presentation/NotesPage";

function NotesPageContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const userSubjects = useSelector(
    (state) => state.auth.userDetails?.course[0]?.subjects
  );

  const userRole = useSelector((state) => state.auth.userDetails?.role);

  function toggleUploadModal() {
    setShowUploadModal(!showUploadModal);
  }

  const onNotesUpload = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.uploadNotes(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);
      setShowUploadModal(false);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <NotesPage
      isSubmitting={isSubmitting}
      showUploadModal={showUploadModal}
      userSubjects={userSubjects}
      userRole={userRole}
      toggleUploadModal={toggleUploadModal}
      onNotesUpload={onNotesUpload}
    />
  );
}

export default NotesPageContainer;
