import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseService from "@/services/CourseService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { addCourse, updateCourse } from "@/store/CourseSlice";
import ManageCourse from "../presentation/ManageCourse";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/route";

function ManageCourseContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serachParams] = useSearchParams();
  const courseId = serachParams.get("courseId");

  const selectedCourse = useSelector((state) =>
    state.courses.courses?.find((course) => course._id === courseId)
  );

  const onCourseUpload = async (data) => {
    setIsSubmitting(true);

    const response = await CourseService.createCourse(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      dispatch(addCourse(response.data));

      toast.success(response?.message);
      navigate(ROUTES.COURSE);
    } else {
      toast.error(
        response?.formError ||
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
      toast.success(response?.message);
      navigate(ROUTES.COURSE);
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const navigateBackToCourse = () => {
    navigate(ROUTES.COURSE);
  };

  return (
    <div>
      <ManageCourse
        selectedCourse={selectedCourse}
        isSubmitting={isSubmitting}
        onSubmit={selectedCourse?._id ? onCourseUpdate : onCourseUpload}
        navigateBackToCourse={navigateBackToCourse}
      />
    </div>
  );
}

export default ManageCourseContainer;
