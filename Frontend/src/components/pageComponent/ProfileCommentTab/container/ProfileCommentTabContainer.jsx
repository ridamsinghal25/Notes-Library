import React from "react";

import useCommentsByUser from "@/hooks/useCommentsByUser";
import ProfileCommentsTab from "../presentation/ProfileCommentTab";

function ProfileCommentsTabContainer() {
  const { isFetchingNotes, userComments } = useCommentsByUser();

  return (
    <ProfileCommentsTab
      isFetchingNotes={isFetchingNotes}
      userComments={userComments}
    />
  );
}

export default ProfileCommentsTabContainer;
