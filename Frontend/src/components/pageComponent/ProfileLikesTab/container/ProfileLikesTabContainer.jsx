import React from "react";
import ProfileLikesTab from "../presentation/ProfileLikesTab";
import useLikedNotesByUser from "@/hooks/useLikedNotesByUser";

function ProfileLikesTabContainer() {
  const { isFetchingNotes, userLikedNotes } = useLikedNotesByUser();

  return (
    <ProfileLikesTab
      isFetchingNotes={isFetchingNotes}
      userLikedNotes={userLikedNotes}
    />
  );
}

export default ProfileLikesTabContainer;
