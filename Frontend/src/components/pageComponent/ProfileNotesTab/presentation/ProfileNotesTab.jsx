import ProfilePageNotesSkeleton from "@/components/basic/ProfilePageNotesSkeleton";
import React from "react";
import ProfileNotesCard from "../../ProfileNotesCard";
import { UserRolesEnum } from "@/constants/constants";

function ProfileNotesTab({ isFetchingNotes, userNotesInfo, userDetails }) {
  return userDetails?.role === UserRolesEnum.ADMIN ? (
    <div>
      {isFetchingNotes ? (
        <ProfilePageNotesSkeleton />
      ) : (
        <>
          {userNotesInfo?.length > 0 ? (
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-bold">Your Uploaded Notes</h2>
              <p className="text-gray-400">
                You have {userNotesInfo?.length} notes available
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-bold">No notes uploaded</h2>
            </div>
          )}

          {userNotesInfo?.map((notesInfo) => (
            <ProfileNotesCard
              key={notesInfo?._id}
              notesInfo={notesInfo}
              userDetails={userDetails}
            />
          ))}
        </>
      )}
    </div>
  ) : null;
}

export default ProfileNotesTab;
