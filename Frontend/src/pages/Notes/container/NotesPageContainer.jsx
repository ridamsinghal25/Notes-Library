import { useDispatch, useSelector } from "react-redux";
import NotesPage from "../presentation/NotesPage";
import { toggleModal } from "@/store/ModalSlice";

function NotesPageContainer() {
  const dispatch = useDispatch();

  const userSubjects = useSelector(
    (state) => state.auth.userDetails?.course[0]?.subjects
  );

  const userRole = useSelector((state) => state.auth.userDetails?.role);

  function toggleNotesModal() {
    dispatch(toggleModal({ modalType: "notesModal" }));
  }

  return (
    <NotesPage
      userSubjects={userSubjects}
      userRole={userRole}
      toggleNotesModal={toggleNotesModal}
    />
  );
}

export default NotesPageContainer;
