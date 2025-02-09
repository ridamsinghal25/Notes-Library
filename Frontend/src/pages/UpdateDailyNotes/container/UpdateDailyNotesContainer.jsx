import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import UpdateNotes from "../presentation/UpdateDailyNotes";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import DailyNotesService from "@/services/DailyNotesService";
import { updateNotes } from "@/store/DailyNotesSlice";

function UpdateDailyNotesContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSubjectChapters, setCurrentSubjectChapters] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParmas] = useSearchParams();
  const dailyNotesId = searchParmas.get("dailyNotesId");

  const selectedNotes = useSelector((state) =>
    state.dailyNotes?.notes.find((note) => note._id === dailyNotesId)
  );

  useEffect(() => {
    if (!dailyNotesId || !selectedNotes) {
      navigate(-1);
    }
  }, [dailyNotesId, selectedNotes]);

  const userSubjects = useSelector(
    (state) => state.auth.userDetails?.course?.subjects
  );

  const onDailyNotesUpdate = async (data) => {
    setIsSubmitting(true);

    const response = await DailyNotesService.updateNotes(dailyNotesId, data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      dispatch(
        updateNotes({
          dailyNotesId,
          newUpdatedNotes: response?.data,
        })
      );

      toast.success(response?.message);
      navigate(
        `${ROUTES.LIST_DAILY_NOTES}?subject=${response.data?.subject}&chapterName=${response.data?.chapterName}`
      );
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  const getSubjectChapters = (subject) => {
    const currentSubject = userSubjects.find(
      (sub) => sub.subjectName === subject
    );

    setCurrentSubjectChapters(currentSubject.chapters);
  };

  return (
    <UpdateNotes
      userSubjects={userSubjects}
      selectedNotes={selectedNotes}
      isSubmitting={isSubmitting}
      onDailyNotesUpdate={onDailyNotesUpdate}
      navigate={navigate}
      getSubjectChapters={getSubjectChapters}
      currentSubjectChapters={currentSubjectChapters}
    />
  );
}

export default UpdateDailyNotesContainer;
