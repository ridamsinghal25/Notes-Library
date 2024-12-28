import React from "react";

import useCommentsByUser from "@/hooks/useCommentsByUser";
import ProfileCommentsTab from "../presentation/ProfileCommentTab";

function ProfileCommentsTabContainer() {
  const { isFetchingComments, userComments } = useCommentsByUser();

  return (
    <ProfileCommentsTab
      isFetchingComments={isFetchingComments}
      userComments={userComments}
    />
  );
}

export default ProfileCommentsTabContainer;
