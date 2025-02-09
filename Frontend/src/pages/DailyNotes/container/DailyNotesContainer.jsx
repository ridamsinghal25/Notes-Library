import React, { useEffect } from "react";
import DailyNotes from "../presentation/DailyNotes";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/constants/route";

function DailyNotesContainer() {
  const navigate = useNavigate();
  const { subject } = useParams();

  useEffect(() => {
    if (!subject) {
      navigate(ROUTES.NOTES);
    }
  }, [subject]);

  const subjectChapters = useSelector(
    (state) =>
      state.auth.userDetails?.course?.subjects?.find(
        (sub) => sub.subjectName === subject?.toString()
      )?.chapters
  );

  const userRole = useSelector((state) => state.auth.userDetails?.role);

  return (
    <DailyNotes
      subjectChapters={subjectChapters}
      userRole={userRole}
      subject={subject}
    />
  );
}

export default DailyNotesContainer;
