import useUploadedNotesByUser from "@/hooks/useUploadedNotesByUser";
import React from "react";
import ProfileNotesTab from "../presentation/ProfileNotesTab";

function ProfileNotesTabContainer() {
  const { isFetchingNotes, userNotesInfo } = useUploadedNotesByUser();

  return (
    <ProfileNotesTab
      isFetchingNotes={isFetchingNotes}
      userNotesInfo={userNotesInfo}
    />
  );
}

export default ProfileNotesTabContainer;
