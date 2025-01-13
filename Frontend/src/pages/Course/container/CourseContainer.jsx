import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse, toggleModal } from "@/store/ModalSlice";
import Course from "../presentation/Course";
import { useEffect } from "react";
import { fetchCourse } from "@/store/CourseSlice";
import { UserRolesEnum } from "@/constants/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";

function CourseContainer() {
  const courses = useSelector((state) => state.courses?.courses);
  const userRole = useSelector((state) => state.auth.userDetails?.role);
  const userId = useSelector((state) => state.auth.userDetails?._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRole === UserRolesEnum.ADMIN) {
      dispatch(fetchCourse());
    }
  }, [dispatch, userRole]);

  const toggelDeleteModal = (course) => {
    dispatch(toggleModal({ modalType: "deleteCourseModal" }));
    dispatch(setSelectedCourse(course));
  };

  const navigateToCourseUsers = (courseId) => {
    navigate(ROUTES.COURSE_USERS, { state: { courseId } });
  };

  const navigateToManageCourse = (course) => {
    if (course?._id) {
      navigate(ROUTES.MANAGE_COURSE);
      dispatch(setSelectedCourse(course));
      return;
    }
    navigate(ROUTES.MANAGE_COURSE);
  };

  return (
    <Course
      courses={courses}
      toggelDeleteModal={toggelDeleteModal}
      userId={userId}
      navigateToManageCourse={navigateToManageCourse}
      navigateToCourseUsers={navigateToCourseUsers}
    />
  );
}

export default CourseContainer;
