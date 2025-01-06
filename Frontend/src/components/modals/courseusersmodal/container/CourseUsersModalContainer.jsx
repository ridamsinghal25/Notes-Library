import React, { useCallback, useEffect, useState } from "react";
import CourseUsersModal from "../presentation/CourseUsersModal";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse, toggleModal } from "@/store/ModalSlice";
import CourseService from "@/services/CourseService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { setUsers } from "@/store/CourseSlice";

function CourseUsersModalContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();

  const showCourseUsersModal = useSelector(
    (state) => state.modal.modals?.courseUsersModal
  );
  const users = useSelector((state) => state.courses?.users);
  const selectedCourseId = useSelector((state) => state.modal?.selectedCourse);

  const itemsPerPage = 10;

  const getUsersEnrolledInCourse = useCallback(async () => {
    setIsLoading(true);

    const response = await CourseService.getCourseUsers(
      selectedCourseId.courseId,
      currentPage
    );

    setIsLoading(false);

    if (!(response instanceof ApiError)) {
      dispatch(setUsers(response?.data?.users || []));
      setTotalPages(
        response?.data?.totalUsers &&
          Math.ceil(response?.data?.totalUsers / itemsPerPage)
      );
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }
  }, [selectedCourseId, currentPage]);

  useEffect(() => {
    if (selectedCourseId.courseId) {
      getUsersEnrolledInCourse();
    }
  }, [selectedCourseId, currentPage, getUsersEnrolledInCourse]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleCourseUsersModal = () => {
    dispatch(toggleModal({ modalType: "courseUsersModal" }));
    dispatch(setSelectedCourse({}));
  };

  return (
    <CourseUsersModal
      setShowDialog={toggleCourseUsersModal}
      showDialog={showCourseUsersModal}
      isLoading={isLoading}
      users={users}
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  );
}

export default CourseUsersModalContainer;
