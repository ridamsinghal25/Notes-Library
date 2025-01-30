import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse } from "@/store/ModalSlice";
import CourseService from "@/services/CourseService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { addCourse, updateCourse } from "@/store/CourseSlice";
import ManageCourse from "../presentation/ManageCourse";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { courseFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

function ManageCourseContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentSubject, setCurrentSubject] = useState("");
  const [currentChapter, setCurrentChapter] = useState("");
  const [editingSubject, setEditingSubject] = useState(null);

  const selectedCourse = useSelector((state) => state.modal.selectedCourse);

  const courseForm = useForm({
    resolver: zodResolver(courseFormValidation),
    defaultValues: {
      courseName: selectedCourse?.courseName || "",
      semester: selectedCourse?.semester || "",
      subjects: selectedCourse?.subjects || [],
      startDate: selectedCourse?.startDate?.split("T")[0] || "",
      endDate: selectedCourse?.endDate?.split("T")[0] || "",
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: courseForm.control,
    name: "subjects",
  });

  const addSubject = () => {
    if (!currentSubject) return;

    append({ subjectName: currentSubject.trim(), chapters: [] });

    setCurrentSubject("");
  };

  const removeSubject = (subjectIndex) => {
    remove(subjectIndex);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSubject();
    }
  };

  const addChapter = (subjectIndex) => {
    if (currentChapter.trim()) {
      const updatedSubject = { ...fields[subjectIndex] };
      updatedSubject.chapters.push(currentChapter.trim());

      update(subjectIndex, updatedSubject);
      setCurrentChapter("");
    }
  };

  const removeChapter = (subjectIndex, chapterIndex) => {
    const updatedSubject = { ...fields[subjectIndex] };

    updatedSubject.chapters.splice(chapterIndex, 1);
    update(subjectIndex, updatedSubject);
  };

  const onCourseUpload = async (data) => {
    setIsSubmitting(true);

    const response = await CourseService.createCourse(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      dispatch(addCourse(response.data));

      toast.success(response?.message);
      navigate(ROUTES.COURSE);
    } else {
      const errorMessage = Object.values(response?.errorResponse?.errors?.[0]);

      toast.error(
        errorMessage[0] ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const onCourseUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await CourseService.updateCourse(
      selectedCourse?._id,
      data
    );

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      dispatch(
        updateCourse({
          courseId: selectedCourse?._id,
          newCourse: response?.data,
        })
      );
      dispatch(setSelectedCourse({}));
      toast.success(response?.message);
      navigate(ROUTES.COURSE);
    } else {
      const errorMessage = Object.values(response?.errorResponse?.errors?.[0]);

      toast.error(
        errorMessage[0] ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const navigateBackToCourse = () => {
    navigate(ROUTES.COURSE);
    dispatch(setSelectedCourse({}));
  };

  return (
    <div>
      <ManageCourse
        selectedCourse={selectedCourse}
        isSubmitting={isSubmitting}
        onSubmit={selectedCourse?._id ? onCourseUpdate : onCourseUpload}
        currentSubject={currentSubject}
        setCurrentSubject={setCurrentSubject}
        addSubject={addSubject}
        removeSubject={removeSubject}
        handleKeyPress={handleKeyPress}
        navigateBackToCourse={navigateBackToCourse}
        currentChapter={currentChapter}
        setCurrentChapter={setCurrentChapter}
        removeChapter={removeChapter}
        addChapter={addChapter}
        editingSubject={editingSubject}
        setEditingSubject={setEditingSubject}
        courseForm={courseForm}
        fields={fields}
      />
    </div>
  );
}

export default ManageCourseContainer;
