import useUploadedNotesByUser from "@/hooks/useUploadedNotesByUser";
import ProfilePage from "@/pages/ProfilePage/presentation/ProfilePage";
import { useSelector } from "react-redux";

function ProfilePageContainer() {
  const { isFetchingNotes, userNotesInfo } = useUploadedNotesByUser();
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
