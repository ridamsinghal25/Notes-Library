import React, { useState, useCallback } from "react";
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

  const handleFileChange = useCallback(
    (event) => {
      if (event.target.files) {
        const newFiles = Array.from(event.target.files).map((file) => {
          return {
            id: Math.random().toString(36).substring(2),
            file,
          };
        });

        setFiles(() => [...newFiles]);

        dailyNotesForm.setValue("files", [
          ...dailyNotesForm.getValues("files"),
        ]);
      }
    },
    [dailyNotesForm]
  );

  const moveFile = useCallback(
    (id, direction) => {
      const index = files.findIndex((file) => file.id === id);

      if (
        (direction === "up" && index === 0) ||
        (direction === "down" && index === files.length - 1)
      ) {
        return files;
      }

      const [movedFile] = files.splice(index, 1);

      files.splice(direction === "up" ? index - 1 : index + 1, 0, movedFile);

      setFiles(() => [...files]);

      dailyNotesForm.setValue(
        "files",
        files.map((item) => item.file)
      );
    },
    [dailyNotesForm, files]
  );

  const removeFile = useCallback(
    (id) => {
      const updatedFiles = files.filter((file) => file.id !== id);

      setFiles(updatedFiles);

      dailyNotesForm.setValue(
        "files",
        updatedFiles.map((item) => item.file)
      );
    },
    [dailyNotesForm, files]
  );

  const onNotesCreate = async (data) => {
    setIsSubmitting(true);

    const response = await DailyNotesService.createNotes(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message || "Notes uploaded successfully");

      dispatch(addNotes(response?.data));
      navigate(`${ROUTES.DAILY_NOTES?.replace(":subject", data.subject)}`);
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
