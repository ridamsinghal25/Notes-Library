import useUploadedNotesByUser from "@/hooks/useUploadedNotesByUser";
import ProfilePage from "@/pages/ProfilePage/presentation/ProfilePage";
import { toggleModal } from "@/store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";

function ProfilePageContainer() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);

  const toggleAvatarUploadModal = () => {
    dispatch(toggleModal({ modalType: "avatarUploadModal" }));
  };

  return (
    <ProfilePage
      userDetails={userDetails}
      toggleAvatarUploadModal={toggleAvatarUploadModal}
    />
  );
}

export default ProfilePageContainer;
