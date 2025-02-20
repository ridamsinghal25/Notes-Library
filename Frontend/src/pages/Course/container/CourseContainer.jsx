import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse, toggleModal } from "@/store/ModalSlice";
import Course from "../presentation/Course";
import { useEffect, useState } from "react";
import { fetchCourse } from "@/store/CourseSlice";
import { UserRolesEnum } from "@/constants/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";

function CourseContainer() {
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const courses = useSelector((state) => state.courses?.courses);
  const status = useSelector((state) => state.courses?.status);
  const userRole = useSelector((state) => state.auth.userDetails?.role);
  const userId = useSelector((state) => state.auth.userDetails?._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRole === UserRolesEnum.ADMIN) {
      dispatch(fetchCourse());
    }
  }, [dispatch, userRole]);

  const toggelDeleteModal = (courseId) => {
    dispatch(toggleModal({ modalType: "deleteCourseModal" }));
    dispatch(setSelectedCourse(courseId));
  };

  const navigateToCourseUsers = (courseId) => {
    navigate(ROUTES.COURSE_USERS, { state: { courseId } });
  };

  const navigateToManageCourse = (courseId) => {
    if (courseId) {
      navigate(`${ROUTES.MANAGE_COURSE}/?courseId=${courseId}`);
      return;
    }
    navigate(ROUTES.MANAGE_COURSE);
  };

  const toggleChapters = (courseId, subjectIndex) => {
    setExpandedSubjects((prev) => ({
      ...prev,
      [`${courseId}-${subjectIndex}`]: !prev[`${courseId}-${subjectIndex}`],
    }));
  };

  return (
    <Course
      courses={courses}
      status={status}
      toggelDeleteModal={toggelDeleteModal}
      userId={userId}
      navigateToManageCourse={navigateToManageCourse}
      navigateToCourseUsers={navigateToCourseUsers}
      toggleChapters={toggleChapters}
      expandedSubjects={expandedSubjects}
    />
  );
}

export default CourseContainer;
