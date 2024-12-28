import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AVATAR_URL, UserRolesEnum } from "@/constants/constants";
import AvatarUploadModalContainer from "@/components/modals/avatarmodal/container/AvatarUploadModalContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Heart,
  MessageSquare,
  NotepadText,
  User,
} from "lucide-react";
import ProfileNotesTabContainer from "@/components/pageComponent/ProfileNotesTab/container/ProfileNotesTabContainer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ProfileLikesTabContainer from "@/components/pageComponent/ProfileLikesTab/container/ProfileLikesTabContainer";
import ProfileCommentsTabContainer from "@/components/pageComponent/ProfileCommentTab/container/ProfileCommentTabContainer";

function ProfilePage({ userDetails, toggleAvatarUploadModal }) {
  return (
    <div className="pt-6 mt-4">
      <HelmetProvider>
        <Helmet>
          <title>Profile</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a profile page" />
        </Helmet>
      </HelmetProvider>
      <div>
        {/* Profile Photo */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            className="p-0 h-auto rounded-full flex justify-start"
            onClick={toggleAvatarUploadModal}
          >
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={userDetails?.avatar?.url || AVATAR_URL}
                alt="Profile picture"
                className="rounded-full hover:opacity-90 transition-opacity duration-300 object-cover"
              />
              <AvatarFallback>{userDetails?.fullName}</AvatarFallback>
            </Avatar>
          </Button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{userDetails?.fullName}</h1>
            <p className="text-muted-foreground">
              Joined {new Date(userDetails?.createdAt).toDateString()}
            </p>
          </div>
        </div>

        {/* Avatar Upload Modal */}
        <AvatarUploadModalContainer
          avatarUrl={userDetails?.avatar?.url || AVATAR_URL}
        />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-none sm:flex space-y-3 sm:space-y-0 sm:justify-start h-28 sm:h-12">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 flex-1 mt-3 sm:mt-0"
            >
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            {userDetails?.role === UserRolesEnum.ADMIN && (
              <TabsTrigger
                value="notes"
                className="flex items-center gap-2 flex-1"
              >
                <BookOpen className="h-4 w-4" />
                Notes
              </TabsTrigger>
            )}

            <TabsTrigger
              value="likes"
              className="flex items-center gap-2 flex-1"
            >
              <Heart className="h-4 w-4" />
              Likes
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="flex items-center gap-2 flex-1"
            >
              <MessageSquare className="h-4 w-4" />
              Comments
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
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
              <div className="flex items-center">
                <NotepadText className="w-6 h-6 text-green-500 mr-3 mb-4" />
                <h3 className="text-xl font-bold mb-4  text-gray-800 dark:text-gray-200">
                  Subjects
                </h3>
              </div>

              <div className="space-y-2 border-[1px] border-gray-100 p-2 py-6 rounded">
                {userDetails?.course?.subjects.map((subject, index) => (
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
            </div>
          </TabsContent>

          {/* Notes Section */}
          <TabsContent value="notes" className="mt-6">
            <ProfileNotesTabContainer />
          </TabsContent>

          <TabsContent value="likes" className="mt-6">
            <ProfileLikesTabContainer />
          </TabsContent>

          <TabsContent value="comments" className="mt-6">
            <ProfileCommentsTabContainer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfilePage;
