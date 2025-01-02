import React, { useEffect, useState } from "react";
import CourseModal from "../presentation/CourseModal";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse, toggleModal } from "@/store/ModalSlice";
import CourseService from "@/services/CourseService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { addCourse, updateCourse } from "@/store/CourseSlice";

function CourseModalContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [currentSubject, setCurrentSubject] = useState("");

  const selectedCourse = useSelector((state) => state.modal.selectedCourse);
  const [subjects, setSubjects] = useState(selectedCourse?.subjects || []);

  const showCourseModal = useSelector(
    (state) => state.modal.modals.courseModal
  );

  useEffect(() => {
    setSubjects(selectedCourse?.subjects || []);
  }, [selectedCourse]);

  const toggleCourseModal = (selectedCourse) => {
    dispatch(toggleModal({ modalType: "courseModal" }));

    if (selectedCourse?._id) {
      dispatch(setSelectedCourse({}));
    }
  };

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
      toast.success(response?.message);
      toggleCourseModal();
      dispatch(addCourse(response.data));
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
      toast.success(response?.message);
      toggleCourseModal();

      dispatch(
        updateCourse({
          courseId: selectedCourse?._id,
          newCourse: response?.data,
        })
      );
      dispatch(setSelectedCourse({}));
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  };

  return (
    <div>
      {selectedCourse?._id ? (
        <div>
          {/* If a course is selected, show the edit course modal */}
          <CourseModal
            selectedCourse={selectedCourse}
            showDialog={showCourseModal}
            setShowDialog={toggleCourseModal}
            isSubmitting={isSubmitting}
            onSubmit={onCourseUpdate}
            currentSubject={currentSubject}
            setCurrentSubject={setCurrentSubject}
            subjects={subjects}
            setSubjects={setSubjects}
            addSubject={addSubject}
            removeSubject={removeSubject}
            handleKeyPress={handleKeyPress}
          />
        </div>
      ) : (
        <CourseModal
          showDialog={showCourseModal}
          setShowDialog={toggleCourseModal}
          isSubmitting={isSubmitting}
          onSubmit={onCourseUpload}
          currentSubject={currentSubject}
          setCurrentSubject={setCurrentSubject}
          subjects={subjects}
          setSubjects={setSubjects}
          addSubject={addSubject}
          removeSubject={removeSubject}
          handleKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
}

export default CourseModalContainer;
