import { UserRolesEnum } from "@/constants/constants";
import ApiError from "@/services/ApiError";
import NotesService from "@/services/NotesService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function useUploadedNotesByUser() {
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  const [userNotesInfo, setUserNotesInfo] = useState([]);
  const userRole = useSelector((state) => state.auth.userDetails?.role);

  useEffect(() => {
    const fetchUserProfileInfo = async () => {
      setIsFetchingNotes(true);

      const response = await NotesService.getNotesUploadedByUser();

      setIsFetchingNotes(false);

      if (!(response instanceof ApiError)) {
        toast.success(response?.message);
        setUserNotesInfo(response?.data);
      } else {
        toast.error(response?.errorResponse?.message || response?.errorMessage);
      }
    };

    if (userRole === UserRolesEnum.ADMIN) {
      fetchUserProfileInfo();
    }
  }, []);

  return {
    isFetchingNotes,
    userNotesInfo,
  };
}

export default useUploadedNotesByUser;
