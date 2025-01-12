import { useSelector } from "react-redux";
import NotesPage from "../presentation/NotesPage";

function NotesPageContainer() {
  const userSubjects = useSelector(
    (state) => state.auth.userDetails?.course?.subjects
  );

  const userRole = useSelector((state) => state.auth.userDetails?.role);

  return <NotesPage userSubjects={userSubjects} userRole={userRole} />;
}

export default NotesPageContainer;
