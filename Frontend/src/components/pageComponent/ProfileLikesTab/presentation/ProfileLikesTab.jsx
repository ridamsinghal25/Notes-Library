import ProfilePageNotesSkeleton from "@/components/basic/ProfilePageNotesSkeleton";
import React from "react";
import ProfileNotesCard from "../../ProfileNotesCard";

function ProfileLikesTab({ isFetchingNotes, userLikedNotes }) {
  return (
    <div>
      {isFetchingNotes ? (
        <ProfilePageNotesSkeleton />
      ) : (
        <>
          {userLikedNotes?.length > 0 ? (
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-bold">Your Liked Notes</h2>
              <p className="text-gray-400">
                You have liked {userLikedNotes?.length} notes
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-bold">No notes Liked</h2>
            </div>
          )}

          {userLikedNotes?.map((notesInfo) => (
            <ProfileNotesCard
              key={notesInfo?._id}
              notesInfo={notesInfo.likedNotes}
              userDetails={notesInfo.createdBy}
              isNotesTab={false}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ProfileLikesTab;
