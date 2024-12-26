import ApiError from "@/services/ApiError";
import CommentService from "@/services/CommentService";
import { setComments } from "@/store/ProfileSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function useCommentsByUser() {
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const dispatch = useDispatch();
  const userComments = useSelector((state) => state.profile?.comments);

  useEffect(() => {
    const fetchUserComments = async () => {
      setIsFetchingComments(true);

      const response = await CommentService.getUserComments();

      setIsFetchingComments(false);

      if (!(response instanceof ApiError)) {
        toast.success(response?.message);
        dispatch(setComments(response?.data));
      } else {
        toast.error(response?.errorResponse?.message || response?.errorMessage);
      }
    };

    if (userComments?.length === 0) {
      fetchUserComments();
    }
  }, []);

  return {
    isFetchingComments,
    userComments,
  };
}

export default useCommentsByUser;
