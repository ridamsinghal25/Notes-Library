import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse, toggleModal } from "@/store/ModalSlice";
import Course from "../presentation/Course";
import { useEffect } from "react";
import { fetchCourse } from "@/store/CourseSlice";
import { UserRolesEnum } from "@/constants/constants";

function CourseContainer() {
  const courses = useSelector((state) => state.courses?.courses);
  const userRole = useSelector((state) => state.auth.userDetails?.role);
  const userId = useSelector((state) => state.auth.userDetails?._id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userRole === UserRolesEnum.ADMIN) {
      dispatch(fetchCourse());
    }
  }, [dispatch, userRole]);

  const toggleCourseModal = () => {
    dispatch(toggleModal({ modalType: "courseModal" }));
  };

  const toggleEditCourseModal = (editingCourse) => {
    dispatch(toggleModal({ modalType: "courseModal" }));
    dispatch(setSelectedCourse(editingCourse));
  };

  const toggelDeleteModal = (course) => {
    dispatch(toggleModal({ modalType: "deleteModal" }));
    dispatch(setSelectedCourse(course));
  };

  return (
    <Course
      courses={courses}
      toggleCourseModal={toggleCourseModal}
      toggleEditCourseModal={toggleEditCourseModal}
      toggelDeleteModal={toggelDeleteModal}
      userId={userId}
    />
  );
}

export default CourseContainer;
