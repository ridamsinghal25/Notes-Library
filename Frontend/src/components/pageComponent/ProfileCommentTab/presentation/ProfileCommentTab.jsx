import ProfilePageNotesSkeleton from "@/components/basic/ProfilePageNotesSkeleton";
import React from "react";
import ProfileNotesCard from "../../ProfileNotesCard";

function ProfileCommentsTab({ isFetchingComments, userComments }) {
  return (
    <div>
      {isFetchingComments ? (
        <ProfilePageNotesSkeleton />
      ) : (
        <>
          {userComments?.length > 0 ? (
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-bold">Your comments</h2>
              <p className="text-gray-400">
                You have {userComments?.length} comments
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-bold">No comment posted</h2>
            </div>
          )}

          {userComments?.map((commentsInfo) => (
            <ProfileNotesCard
              key={commentsInfo?._id}
              notesInfo={commentsInfo.notes}
              userDetails={commentsInfo.owner}
              commentContent={commentsInfo.content}
              isNotesTab={false}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ProfileCommentsTab;
