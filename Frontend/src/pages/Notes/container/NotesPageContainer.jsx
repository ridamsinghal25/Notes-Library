import { useSelector } from "react-redux";
import NotesPage from "../presentation/NotesPage";

function NotesPageContainer() {
  const userSubjects = useSelector((state) =>
    state.auth.userDetails?.course?.subjects?.map(
      (subject) => subject.subjectName
    )
  );

  const userRole = useSelector((state) => state.auth.userDetails?.role);

  return <NotesPage userSubjects={userSubjects} userRole={userRole} />;
}

export default NotesPageContainer;
