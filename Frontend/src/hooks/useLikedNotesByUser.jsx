import ApiError from "@/services/ApiError";
import NotesService from "@/services/NotesService";
import { setLikedNotes } from "@/store/ProfileSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function useLikedNotesByUser() {
  const [isFetchingLikes, setIsFetchingLikes] = useState(false);
  const dispatch = useDispatch();
  const userLikedNotes = useSelector((state) => state.profile?.likedNotes);

  useEffect(() => {
    const fetchUserLikedNotesInfo = async () => {
      setIsFetchingLikes(true);

      const response = await NotesService.getNotesLikedByUser();

      setIsFetchingLikes(false);

      if (!(response instanceof ApiError)) {
        toast.success(response?.message);
        dispatch(setLikedNotes(response?.data));
      } else {
        toast.error(response?.errorResponse?.message || response?.errorMessage);
      }
    };

    if (userLikedNotes?.length === 0) {
      fetchUserLikedNotesInfo();
    }
  }, []);

  return {
    isFetchingLikes,
    userLikedNotes,
  };
}

export default useLikedNotesByUser;
