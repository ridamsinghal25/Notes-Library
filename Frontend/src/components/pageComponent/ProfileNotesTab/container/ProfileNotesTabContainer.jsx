import useUploadedNotesByUser from "@/hooks/useUploadedNotesByUser";
import React from "react";
import { useSelector } from "react-redux";
import ProfileNotesTab from "../presentation/ProfileNotesTab";

function ProfileNotesTabContainer() {
  const { isFetchingNotes, userNotesInfo } = useUploadedNotesByUser();
  const userDetails = useSelector((state) => state.auth.userDetails);

  return (
    <ProfileNotesTab
      isFetchingNotes={isFetchingNotes}
      userNotesInfo={userNotesInfo}
      userDetails={userDetails}
    />
  );
}

export default ProfileNotesTabContainer;
