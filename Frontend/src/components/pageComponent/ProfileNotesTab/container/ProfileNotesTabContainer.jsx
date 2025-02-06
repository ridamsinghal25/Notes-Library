import useUploadedNotesByUser from "@/hooks/useUploadedNotesByUser";
import React from "react";
import ProfileNotesTab from "../presentation/ProfileNotesTab";
import { useSelector } from "react-redux";

function ProfileNotesTabContainer() {
  const { isFetchingNotes, userNotesInfo } = useUploadedNotesByUser();
  const userRole = useSelector((state) => state.auth.userDetails?.role);

  return (
    <ProfileNotesTab
      isFetchingNotes={isFetchingNotes}
      userRole={userRole}
      userNotesInfo={userNotesInfo}
    />
  );
}

export default ProfileNotesTabContainer;
