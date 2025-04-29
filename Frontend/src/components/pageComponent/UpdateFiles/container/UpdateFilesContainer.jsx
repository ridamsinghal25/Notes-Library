import { useDispatch } from "react-redux";
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
import imageCompression from "browser-image-compression";
import { renameFiles } from "@/utils/renameFiles";

function UpdateFilesContainer({ selectedNotes }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentFiles, setCurrentFiles] = useState(selectedNotes?.notes || []);
  const [formFiles, setFormFiles] = useState([]);
  const [deletedfiles, setDeletedfiles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateFilesForm = useForm({
    resolver: zodResolver(updateFilesDailyNotesFormValidation),
    defaultValues: {
      files: [],
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

      setFormFiles([]);

      navigate(
        `${ROUTES.LIST_DAILY_NOTES}?subject=${response.data?.subject}&chapterName=${response.data?.chapterName}`
      );
    } else {
      setFormFiles([]);
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const handleDeleteFile = (publicId) => {
    const deletedFile = currentFiles.find(
      (file) => file.public_id === publicId
    );

    setCurrentFiles((prev) =>
      prev.filter((file) => file.public_id !== publicId)
    );

    setDeletedfiles((prev) => [...prev, deletedFile]);
  };

  const handleRestoreFile = (publicId) => {
    const restoreFile = deletedfiles.find(
      (file) => file.public_id === publicId
    );

    setCurrentFiles((prev) => [...prev, restoreFile]);

    setDeletedfiles((prev) =>
      prev.filter((file) => file.public_id !== publicId)
    );
  };

  const handlePermanentDelete = async () => {
    setIsSubmitting(true);

    const publicIds = deletedfiles?.map((file) => file.public_id);

    const response = await DailyNotesService.deleteFiles(
      selectedNotes?._id,
      publicIds
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

  const handleFileChange = async (event) => {
    const fileList = event.target.files;

    if (fileList.length < 0) {
      toast.error("Please select a file");
    }

    if (formFiles.length + fileList.length - 1 >= 5) {
      toast.error("You can only upload up to 5 files.");
      return Promise.reject();
    }

    const newFiles = Array.from(fileList).map((file) => {
      return {
        id: Math.random().toString(36).substring(2),
        file,
      };
    });

    const options = {
      maxSizeMB: 1, // Target size per image
      maxWidthOrHeight: 1200, // Resize dimensions if necessary
      useWebWorker: true,
    };

    try {
      const compressedFiles = await Promise.all(
        newFiles.map(async ({ file, id }, index) => {
          const compressedImage = await imageCompression(file, options);

          const fileObject = new File(
            [compressedImage],
            `Page-${currentFiles.length + formFiles.length + index + 1}`,
            {
              type: file.type,
            }
          );

          return { id, file: fileObject };
        })
      );

      setFormFiles((prev) => {
        return [...prev, ...compressedFiles];
      });

      updateFilesForm.setValue("files", [
        ...formFiles.concat(compressedFiles).map((file) => file.file),
      ]);
    } catch (error) {
      return null;
    }
  };

  const moveFile = (id, direction) => {
    const index = formFiles.findIndex((file) => file.id === id);

    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === formFiles.length - 1)
    ) {
      return formFiles;
    }

    const [movedFile] = formFiles.splice(index, 1);

    formFiles.splice(direction === "up" ? index - 1 : index + 1, 0, movedFile);

    const newRenamedFiles = renameFiles(formFiles, currentFiles.length);

    setFormFiles(newRenamedFiles);

    updateFilesForm.setValue(
      "files",
      newRenamedFiles.map((item) => item.file)
    );
  };

  const removeFile = (id) => {
    const updatedFiles = formFiles.filter((file) => file.id !== id);

    const newRenamedFiles = renameFiles(updatedFiles, currentFiles.length);

    setFormFiles(newRenamedFiles);

    updateFilesForm.setValue(
      "files",
      newRenamedFiles.map((item) => item.file)
    );
  };

  return (
    <UpdateFiles
      isSubmitting={isSubmitting}
      onDailyNotesFileUpdate={onDailyNotesFileUpdate}
      currentFiles={currentFiles}
      setCurrentFiles={setCurrentFiles}
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
