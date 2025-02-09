import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import DailyNotesService from "@/services/DailyNotesService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateFilesDailyNotesFormValidation } from "@/validation/zodValidation";
import UpdateFiles from "../presentation/UpdateFiles";
import { updateNotes } from "@/store/DailyNotesSlice";

function UpdateFilesContainer({ selectedNotes }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState(selectedNotes?.notes || []);
  const [formFiles, setFormFiles] = useState([]);
  const [deletedfiles, setDeletedfiles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateFilesForm = useForm({
    resolver: zodResolver(updateFilesDailyNotesFormValidation),
    defaultValues: {
      files: null,
    },
  });

  const onDailyNotesFileUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await DailyNotesService.updateNotesPdfFile(
      selectedNotes?._id,
      { files: data?.files, subject: selectedNotes?.subject }
    );

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      dispatch(
        updateNotes({
          dailyNotesId: response?.data?._id,
          newUpdatedNotes: response?.data,
        })
      );

      toast.success(response?.message);

      navigate(
        `${ROUTES.LIST_DAILY_NOTES}?subject=${response.data?.subject}&chapterName=${response.data?.chapterName}`
      );
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const handleDeleteFile = (publicId) => {
    const deletedFile = files.find((file) => file.public_id === publicId);

    setFiles((prev) => prev.filter((file) => file.public_id !== publicId));

    setDeletedfiles((prev) => [...prev, deletedFile]);
  };

  const handleRestoreFile = (publicId) => {
    const restoreFile = deletedfiles.find(
      (file) => file.public_id === publicId
    );

    setFiles((prev) => [...prev, restoreFile]);

    setDeletedfiles((prev) =>
      prev.filter((file) => file.public_id !== publicId)
    );
  };

  const handlePermanentDelete = (pdfId) => {};

  const handleFileChange = useCallback(
    (event) => {
      if (event.target.files) {
        const newFiles = Array.from(event.target.files).map((file) => {
          return {
            id: Math.random().toString(36).substring(2),
            file,
          };
        });

        setFormFiles(() => [...newFiles]);

        updateFilesForm.setValue("files", [
          ...updateFilesForm.getValues("files"),
        ]);
      }
    },
    [updateFilesForm]
  );

  const moveFile = useCallback(
    (id, direction) => {
      const index = formFiles.findIndex((file) => file.id === id);

      if (
        (direction === "up" && index === 0) ||
        (direction === "down" && index === formFiles.length - 1)
      ) {
        return formFiles;
      }

      const [movedFile] = formFiles.splice(index, 1);

      formFiles.splice(
        direction === "up" ? index - 1 : index + 1,
        0,
        movedFile
      );

      setFormFiles(() => [...formFiles]);

      updateFilesForm.setValue(
        "files",
        formFiles.map((item) => item.file)
      );
    },
    [updateFilesForm, formFiles]
  );

  const removeFile = useCallback(
    (id) => {
      const updatedFiles = formFiles.filter((file) => file.id !== id);

      setFormFiles(updatedFiles);

      updateFilesForm.setValue(
        "files",
        updatedFiles.map((item) => item.file)
      );
    },
    [updateFilesForm, formFiles]
  );

  return (
    <UpdateFiles
      isSubmitting={isSubmitting}
      onDailyNotesFileUpdate={onDailyNotesFileUpdate}
      files={files}
      setFiles={setFiles}
      deletedfiles={deletedfiles}
      handleDeleteFile={handleDeleteFile}
      handleRestoreFile={handleRestoreFile}
      handlePermanentDelete={handlePermanentDelete}
      handleFileChange={handleFileChange}
      formFiles={formFiles}
      moveFile={moveFile}
      removeFile={removeFile}
      updateFilesForm={updateFilesForm}
    />
  );
}

export default UpdateFilesContainer;
