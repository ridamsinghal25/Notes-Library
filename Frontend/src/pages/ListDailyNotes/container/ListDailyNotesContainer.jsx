import React, { useEffect, useState } from "react";
import ListDailyNotes from "../presentation/ListDailyNotes";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "@/constants/route";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteNotes, fetchDailyNotes } from "@/store/DailyNotesSlice";
import { setSelectedNotes, toggleModal } from "@/store/ModalSlice";
import DailyNotesService from "@/services/DailyNotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { cloudinaryFilesUrl } from "@/utils/cloudinaryPdfUrl";

function ListDailyNotesContainer() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNote, setSelectedNote] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const selectedNotesId = useSelector((state) => state.modal.selectedNotesId);
  const userRole = useSelector((state) => state.auth.userDetails?.role);
  const dailyNotes = useSelector((state) => state.dailyNotes);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParmams] = useSearchParams();

  const subject = searchParmams.get("subject");
  const chapterName = searchParmams.get("chapterName");

  useEffect(() => {
    if (!subject || !chapterName) {
      return;
    }
    dispatch(fetchDailyNotes({ subject, chapterName }));
  }, [dispatch, subject, chapterName]);

  useEffect(() => {
    if (selectedNote) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedNote]);

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoomLevel(1);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : selectedNote?.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < selectedNote?.length - 1 ? prev + 1 : 0
    );
  };

  const navigateToUpdateDailyNotesPage = (dailyNotesId) => {
    navigate(`${ROUTES.UPDATE_DAILY_NOTES}/?dailyNotesId=${dailyNotesId}`);
  };

  const toggleModalOfPdfCard = (modalType, notesId) => {
    dispatch(toggleModal({ modalType }));

    if (notesId) {
      dispatch(setSelectedNotes(notesId));
    }
  };

  const toggelDeleteModal = () => {
    dispatch(toggleModal({ modalType: "deleteModal" }));
    dispatch(setSelectedNotes(null));
  };

  const onDeleteHandler = async () => {
    setIsDeleting(true);
    const response = await DailyNotesService.deleteNotes(selectedNotesId);

    setIsDeleting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes deleted successfully");

      dispatch(deleteNotes(selectedNotesId));

      toggelDeleteModal();
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const handleDownload = async (url, date, index) => {
    const newPdfUrl = cloudinaryFilesUrl(url, date, chapterName, index);

    const link = document.createElement("a");
    link.href = newPdfUrl;
    link.download = `${chapterName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggelDeleteChapterNotesModal = () => {
    dispatch(toggleModal({ modalType: "deleteChapterNotesModal" }));
  };

  return (
    <ListDailyNotes
      zoomLevel={zoomLevel}
      selectedNote={selectedNote}
      setSelectedNote={setSelectedNote}
      currentImageIndex={currentImageIndex}
      setCurrentImageIndex={setCurrentImageIndex}
      subject={subject}
      chapterName={chapterName}
      dailyNotes={dailyNotes}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      resetZoom={resetZoom}
      handlePrevImage={handlePrevImage}
      handleNextImage={handleNextImage}
      userRole={userRole}
      navigateToUpdateDailyNotesPage={navigateToUpdateDailyNotesPage}
      toggleModalOfPdfCard={toggleModalOfPdfCard}
      onDeleteHandler={onDeleteHandler}
      isDeleting={isDeleting}
      toggelDeleteChapterNotesModal={toggelDeleteChapterNotesModal}
      handleDownload={handleDownload}
    />
  );
}

export default ListDailyNotesContainer;
