import { UserRolesEnum } from "@/constants/constants";
import ApiError from "@/services/ApiError";
import NotesService from "@/services/NotesService";
import { setNotes } from "@/store/ProfileSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function useUploadedNotesByUser() {
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.userDetails?.role);
  const userNotesInfo = useSelector((state) => state.profile?.notes);

  useEffect(() => {
    const fetchNotesUploadedByUser = async () => {
      setIsFetchingNotes(true);

      const response = await NotesService.getNotesUploadedByUser();

      setIsFetchingNotes(false);

      if (!(response instanceof ApiError)) {
        toast.success(response?.message);
        dispatch(setNotes(response?.data));
      } else {
        toast.error(response?.errorResponse?.message || response?.errorMessage);
      }
    };

    if (userRole === UserRolesEnum.ADMIN && userNotesInfo?.length === 0) {
      fetchNotesUploadedByUser();
    }
  }, []);

  return {
    isFetchingNotes,
    userNotesInfo,
  };
}

export default useUploadedNotesByUser;
