import React, { useState } from "react";
import { toast } from "react-toastify";
import { dailyNotesFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AddDailyNotes from "../presentation/AddDailyNotes";
import { useDispatch, useSelector } from "react-redux";
import DailyNotesService from "@/services/DailyNotesService";
import ApiError from "@/services/ApiError";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { addNotes } from "@/store/DailyNotesSlice";
import imageCompression from "browser-image-compression";
import { renameFiles } from "@/utils/renameFiles";

function AddDailyNotesContainer() {
  const [files, setFiles] = useState([]);
  const [currentSubjectChapters, setCurrentSubjectChapters] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userSubjects = useSelector(
    (state) => state.auth.userDetails?.course?.subjects
  );

  const dailyNotesForm = useForm({
    resolver: zodResolver(dailyNotesFormValidation),
    defaultValues: {
      subject: "",
      chapterNumber: "",
      chapterName: "",
      files: [],
    },
  });

  const handleFileChange = async (event) => {
    const fileList = event.target.files;

    if (fileList.length < 0) {
      toast.error("Please select a file");
    }

    if (files.length + fileList.length - 1 >= 5) {
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
            `Page-${files.length + index + 1}`,
            {
              type: file.type,
            }
          );

          return { id, file: fileObject };
        })
      );

      setFiles((prev) => {
        return [...prev, ...compressedFiles];
      });

      dailyNotesForm.setValue("files", [
        ...files.concat(compressedFiles).map((file) => file.file),
      ]);
    } catch (error) {
      return null;
    }
  };

  const moveFile = (id, direction) => {
    const index = files.findIndex((file) => file.id === id);

    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === files.length - 1)
    ) {
      return files;
    }

    const [movedFile] = files.splice(index, 1);

    files.splice(direction === "up" ? index - 1 : index + 1, 0, movedFile);

    const newRenamedFiles = renameFiles(files, 0);

    setFiles(newRenamedFiles);

    dailyNotesForm.setValue(
      "files",
      newRenamedFiles.map((item) => item.file)
    );
  };

  const removeFile = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);

    const newRenamedFiles = renameFiles(updatedFiles, 0);

    setFiles(newRenamedFiles);

    dailyNotesForm.setValue(
      "files",
      newRenamedFiles.map((item) => item.file)
    );
  };

  const onNotesCreate = async (data) => {
    setIsSubmitting(true);

    const response = await DailyNotesService.createNotes(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes uploaded successfully");

      dispatch(addNotes(response?.data));

      setFiles([]);
      navigate(`${ROUTES.DAILY_NOTES?.replace(":subject", data.subject)}`);
    } else {
      setFiles([]);

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
    <AddDailyNotes
      dailyNotesForm={dailyNotesForm}
      handleFileChange={handleFileChange}
      moveFile={moveFile}
      removeFile={removeFile}
      onNotesCreate={onNotesCreate}
      files={files}
      userSubjects={userSubjects}
      getSubjectChapters={getSubjectChapters}
      currentSubjectChapters={currentSubjectChapters}
      isSubmitting={isSubmitting}
      navigate={navigate}
    />
  );
}

export default AddDailyNotesContainer;
