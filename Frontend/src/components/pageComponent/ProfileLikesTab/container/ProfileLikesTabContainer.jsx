import React from "react";
import ProfileLikesTab from "../presentation/ProfileLikesTab";
import useLikedNotesByUser from "@/hooks/useLikedNotesByUser";

function ProfileLikesTabContainer() {
  const { isFetchingLikes, userLikedNotes } = useLikedNotesByUser();

  return (
    <ProfileLikesTab
      isFetchingLikes={isFetchingLikes}
      userLikedNotes={userLikedNotes}
    />
  );
}

export default ProfileLikesTabContainer;
