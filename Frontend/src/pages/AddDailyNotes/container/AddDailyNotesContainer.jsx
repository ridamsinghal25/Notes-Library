import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { dailyNotesFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AddDailyNotes from "../presentation/AddDailyNotes";
import { useSelector } from "react-redux";

function AddDailyNotesContainer() {
  const [files, setFiles] = useState([]);
  const userSubjects = useSelector((state) =>
    state.auth.userDetails?.course?.subjects?.map(
      (subject) => subject.subjectName
    )
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

  const onSubmit = (data) => {
    toast({
      title: "Form submitted",
      description: `Uploaded ${data.files.length} file(s)`,
    });
    console.log("data", data);
    console.log("formdata data.files", data.files);
    console.log("setState files", files);
    // Here you would typically send the files to your server
  };
  return (
    <AddDailyNotes
      dailyNotesForm={dailyNotesForm}
      handleFileChange={handleFileChange}
      moveFile={moveFile}
      removeFile={removeFile}
      onSubmit={onSubmit}
      files={files}
      userSubjects={userSubjects}
    />
  );
}

export default AddDailyNotesContainer;
