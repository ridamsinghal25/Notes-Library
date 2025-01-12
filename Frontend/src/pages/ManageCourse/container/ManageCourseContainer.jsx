import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse } from "@/store/ModalSlice";
import CourseService from "@/services/CourseService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { addCourse, updateCourse } from "@/store/CourseSlice";
import ManageCourse from "../presentation/ManageCourse";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";

function ManageCourseContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentSubject, setCurrentSubject] = useState("");

  const selectedCourse = useSelector((state) => state.modal.selectedCourse);
  const [subjects, setSubjects] = useState(selectedCourse?.subjects || []);

  useEffect(() => {
    setSubjects(selectedCourse?.subjects || []);
  }, [selectedCourse]);

  const addSubject = () => {
    if (!currentSubject) return;
    setSubjects([...subjects, currentSubject]);
    setCurrentSubject("");
  };

  const removeSubject = (subject) => {
    setSubjects(subjects.filter((s) => s !== subject));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSubject();
    }
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
      toast.error(response?.errorResponse?.message || response?.errorMessage);
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
      toast.error(response?.errorResponse?.message || response?.errorMessage);
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
        subjects={subjects}
        setSubjects={setSubjects}
        addSubject={addSubject}
        removeSubject={removeSubject}
        handleKeyPress={handleKeyPress}
        navigateBackToCourse={navigateBackToCourse}
      />
    </div>
  );
}

export default ManageCourseContainer;
