import { Separator } from "@/components/ui/separator";
import React from "react";
import SkeletonArticleList from "@/components/basic/SkeletonArticleList";
import ProfileNotesCard from "@/components/pageComponent/ProfileNotesCard";
import ProfileOverviwPanel from "@/components/pageComponent/ProfileOverviewPanel";
import ProfileNotesHeader from "@/components/pageComponent/ProfileNotesHeader";

function ProfilePage({ isFetchingNotes, userNotesInfo, userDetails }) {
  return (
    <div className="text-gray-900">
      <header className="border-b hidden lg:block  border-gray-200 dark:border-gray-400 dark:bg-black">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif md:text-3xl lg:text-4xl font-bold dark:text-gray-200">
            {userDetails?.fullName}
          </h1>
        </div>
        <Separator />
      </header>

      <main className="container mx-auto gap-10 px-4 lg:px-16 lg:py-8 flex flex-col-reverse lg:flex-row">
        {isFetchingNotes ? (
          <SkeletonArticleList />
        ) : (
          <div className="w-full lg:w-2/3">
            <ProfileNotesHeader
              userRole={userDetails?.role}
              notesLength={userNotesInfo?.length}
            />
            {userNotesInfo?.map((notesInfo) => (
              <ProfileNotesCard
                key={notesInfo?._id}
                notesInfo={notesInfo}
                userDetails={userDetails}
              />
            ))}
          </div>
        )}
        <div className="border-b-2 lg:border-r-2 dark:border-gray-400"></div>
        <ProfileOverviwPanel userDetails={userDetails} />
      </main>
    </div>
  );
}

export default ProfilePage;
