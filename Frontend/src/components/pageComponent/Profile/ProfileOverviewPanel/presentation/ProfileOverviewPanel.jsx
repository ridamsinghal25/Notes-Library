import { Plus } from "lucide-react";
import React from "react";
import { AVATAR_URL } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarUploadModalContainer from "@/components/modals/avatarmodal/container/AvatarUploadModalContainer";
import CollapsibleComponent from "./CollapsibleComponent";

function ProfileOverviwPanel({
  toggleAvatarUploadModal,
  userDetails,
  toggleSubjects,
  isSubjectsOpen,
}) {
  return (
    <aside className="w-full lg:w-1/3 lg:mt-9 relative lg:pl-8">
      <div className="border border-gray-200 dark:border-gray-400 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center relative">
        <div className="flex lg:flex-col gap-4 items-center">
          <div className="relative w-16 h-16 lg:w-32 lg:h-32 rounded-full bg-black border-2 lg:border-[6px] border-violet-600">
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
                className="absolute bottom-0 right-0 w-4 h-4 lg:w-8 lg:h-8 bg-violet-600 rounded-full flex items-center justify-center"
                aria-label="Upload new avatar"
              >
                <Plus className="text-white w-3 h-3 lg:w-5 lg:h-5" />
              </div>
            </Button>
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-gray-900 hover:text-gray-700 transition-colors dark:text-gray-200 hover:opacity-90 dark:transition-opacity duration-300 mt-4 lg:mt-0">
              {userDetails?.fullName}
            </h3>
          </div>
        </div>

        <AvatarUploadModalContainer
          avatarUrl={userDetails?.avatar?.url || AVATAR_URL}
        />

        <CollapsibleComponent
          toggleSubjects={toggleSubjects}
          isSubjectsOpen={isSubjectsOpen}
          userDetails={userDetails}
        />
      </div>
    </aside>
  );
}

export default ProfileOverviwPanel;
