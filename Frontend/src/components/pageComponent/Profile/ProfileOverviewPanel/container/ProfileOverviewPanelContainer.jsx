import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";
import ProfileOverviwPanel from "../presentation/ProfileOverviewPanel";

function ProfileOverviwPanelContainer() {
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);

  function toggleSubjects() {
    setIsSubjectsOpen(!isSubjectsOpen);
  }

  const toggleAvatarUploadModal = () => {
    dispatch(toggleModal({ modalType: "avatarUploadModal" }));
  };

  return (
    <ProfileOverviwPanel
      isSubjectsOpen={isSubjectsOpen}
      toggleSubjects={toggleSubjects}
      userDetails={userDetails}
      toggleAvatarUploadModal={toggleAvatarUploadModal}
    />
  );
}

export default ProfileOverviwPanelContainer;
