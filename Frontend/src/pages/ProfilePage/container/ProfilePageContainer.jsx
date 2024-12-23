import useUploadedNotesByUser from "@/hooks/useUploadedNotesByUser";
import ProfilePage from "@/pages/ProfilePage/presentation/ProfilePage";
import { toggleModal } from "@/store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";

function ProfilePageContainer() {
  const dispatch = useDispatch();
  const { isFetchingNotes, userNotesInfo } = useUploadedNotesByUser();
  const userDetails = useSelector((state) => state.auth.userDetails);

  const toggleAvatarUploadModal = () => {
    dispatch(toggleModal({ modalType: "avatarUploadModal" }));
  };

  return (
    <ProfilePage
      isFetchingNotes={isFetchingNotes}
      userNotesInfo={userNotesInfo}
      userDetails={userDetails}
      toggleAvatarUploadModal={toggleAvatarUploadModal}
    />
  );
}

export default ProfilePageContainer;
