import { AVATAR_URL } from "@/constants/constants";
import { getPreviewImageUrl } from "@/utils/getImageUrl";
import { MessageCircle, ThumbsUp } from "lucide-react";
import React from "react";

function ProfileNotesCard({ notesInfo, userDetails }) {
  return (
    <article className="border border-gray-200 dark:border-gray-400 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 pb-8 mt-4 flex justify-between items-start px-6 sm:p-6">
      <div className="w-3/4">
        <div className="flex items-center mb-4 mt-4">
          <img
            src={userDetails?.avatar?.url || AVATAR_URL}
            alt="Author Avatar"
            className="w-9 h-9 rounded-full mr-3 border-2 border-violet-600"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
              {userDetails?.fullName}
            </p>
          </div>
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-900 hover:text-gray-700 transition-colors duration-300 dark:text-gray-200">
          {notesInfo?.chapterName}
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-4 font-medium">
          {notesInfo?.subject}
        </p>
        <div className="flex flex-wrap gap-4 md:gap-10 items-center mt-7">
          <div className="flex items-center gap-2 dark:text-gray-200">
            <div>
              <ThumbsUp />
            </div>
            {notesInfo?.likesCount}
          </div>
          <div className="flex items-center gap-2 dark:text-gray-200">
            <div>
              <MessageCircle />
            </div>
            {notesInfo?.commentsCount}
          </div>
        </div>
      </div>
      <div>
        <img
          src={getPreviewImageUrl(notesInfo?.pdf?.url)}
          alt="Notes Image"
          className="max-w-28 sm:max-w-36 h-auto rounded-lg mt-8 sm:mt-0 sm:ml-4 shadow-lg object-cover border border-gray-300 hover:opacity-90 transition-opacity duration-300"
        />
      </div>
    </article>
  );
}

export default ProfileNotesCard;
