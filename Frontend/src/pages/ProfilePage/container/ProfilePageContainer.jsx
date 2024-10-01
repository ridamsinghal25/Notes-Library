import userNotesByUser from "@/hooks/useNotesByUser";
import ProfilePage from "@/pages/ProfilePage/presentation/ProfilePage";
import { useSelector } from "react-redux";

function ProfilePageContainer() {
  const { isFetchingNotes, userNotesInfo } = userNotesByUser();
  const userDetails = useSelector((state) => state.auth.userDetails);

  return (
    <ProfilePage
      isFetchingNotes={isFetchingNotes}
      userNotesInfo={userNotesInfo}
      userDetails={userDetails}
    />
  );
}

export default ProfilePageContainer;
