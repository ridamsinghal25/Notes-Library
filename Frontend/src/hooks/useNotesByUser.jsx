import ApiError from "@/services/ApiError";
import NotesService from "@/services/NotesService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function userNotesByUser() {
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  const [userNotesInfo, setUserNotesInfo] = useState([]);

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

    fetchUserProfileInfo();
  }, []);

  return {
    isFetchingNotes,
    userNotesInfo,
  };
}

export default userNotesByUser;
