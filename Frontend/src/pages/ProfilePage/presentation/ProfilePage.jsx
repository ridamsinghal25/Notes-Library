import { Separator } from "@/components/ui/separator";
import React from "react";
import ProfilePageNotesSkeleton from "@/components/basic/ProfilePageNotesSkeleton";
import ProfileNotesCard from "@/components/pageComponent/Profile/ProfileNotesCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, NotepadText, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { AVATAR_URL, UserRolesEnum } from "@/constants/constants";
import AvatarUploadModalContainer from "@/components/modals/avatarmodal/container/AvatarUploadModalContainer";

function ProfilePage({
  isFetchingNotes,
  userNotesInfo,
  userDetails,
  toggleAvatarUploadModal,
}) {
  return (
    <div className="flex">
      {/* Main Content */}

      <main className="flex-1 p-6">
        <div>
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <Button
                  variant="ghost"
                  className="p-0 h-auto w-full rounded-full"
                  onClick={toggleAvatarUploadModal}
                >
                  <Avatar className="relative w-full h-full rounded-full overflow-hidden">
                    <AvatarImage
                      src={userDetails?.avatar?.url || AVATAR_URL}
                      alt="Profile Image"
                      className="rounded-full hover:opacity-90 transition-opacity duration-300 object-cover"
                    />
                    <AvatarFallback className="dark:bg-gray-300">
                      <span className="text-black">User</span>
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="absolute bottom-0 right-0 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center"
                    aria-label="Upload new avatar"
                  >
                    <Plus className="text-white w-3 h-3 lg:w-5 lg:h-5" />
                  </div>
                </Button>
              </div>
              <h2 className="text-2xl font-bold mt-4">
                {userDetails?.fullName}
              </h2>
            </div>

            {/* Avatar Upload Modal */}
            <AvatarUploadModalContainer
              avatarUrl={userDetails?.avatar?.url || AVATAR_URL}
            />

            {/* Academic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Academic Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <div>
                      <p className="text-sm text-gray-400">Course</p>
                      <p>{userDetails?.course?.courseName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <div>
                <div className="flex items-center">
                  <NotepadText className="w-6 h-6 text-green-500 mr-3 mb-4" />
                  <h3 className="text-xl font-bold mb-4  text-gray-800 dark:text-gray-200">
                    Subjects
                  </h3>
                </div>

                <ScrollArea className="h-[200px] border-[1px] border-gray-100 p-2 rounded">
                  <div className="space-y-2">
                    {userDetails.course?.subjects.map((subject, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-4 flex-shrink-0">
                          <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                        </div>
                        <span className="text-gray-800 font-medium text-base text-start dark:text-gray-200">
                          {subject}
                        </span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Notes Section */}
            {userDetails.role === UserRolesEnum.ADMIN && (
              <div>
                {isFetchingNotes ? (
                  <ProfilePageNotesSkeleton />
                ) : (
                  <>
                    <h2 className="text-3xl font-bold">Your Uploaded Notes</h2>
                    <p className="text-gray-400">
                      You have {userNotesInfo.length} notes available
                    </p>

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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
