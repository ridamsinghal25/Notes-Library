import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNotes } from "@/store/NotesSlice";
import NotesSubjectPage from "../presentation/NotesSubjectPage";

function NotesSubjectPageContainer() {
  const subject = useParams();
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes(subject));
  }, [dispatch, subject]);

  return <NotesSubjectPage subject={subject} notesData={notesData} />;
}

export default NotesSubjectPageContainer;
