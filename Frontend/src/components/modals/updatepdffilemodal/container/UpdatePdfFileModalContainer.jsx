import ApiError from "@/services/ApiError";
import UpdatePdfFileModal from "../presentation/UpdatePdfFileModal";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UpdatePdfFileModalContainer(notes) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const showUpdatePdfFileModal = useSelector(
    (state) => state.modal.modals.updatePdfFileModal
  );

  const togglePdfFileModal = () => {
    dispatch(toggleModal({ modalType: "updatePdfFileModal" }));
  };

  const updatePdfFile = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.updateNotesPdfFile(
      notes?._id,
      data?.pdfFile
    );

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };
  return (
    <UpdatePdfFileModal
      isSubmitting={isSubmitting}
      showDialog={showUpdatePdfFileModal}
      setShowDialog={togglePdfFileModal}
      onSubmit={updatePdfFile}
    />
  );
}

export default UpdatePdfFileModalContainer;
