import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseService from "@/services/CourseService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { setUsers } from "@/store/CourseSlice";
import CourseUsers from "../presentation/CourseUsers";
import { useLocation } from "react-router-dom";

function CourseUsersContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();

  const location = useLocation();

  let { courseId } = location.state;

  const users = useSelector((state) => state.courses?.users);

  const itemsPerPage = 10;

  useEffect(() => {
    const getUsersEnrolledInCourse = async () => {
      setIsLoading(true);

      const response = await CourseService.getCourseUsers(
        courseId,
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
    };

    if (courseId) {
      getUsersEnrolledInCourse();
    }
  }, [courseId, currentPage, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <CourseUsers
      isLoading={isLoading}
      users={users}
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  );
}

export default CourseUsersContainer;
