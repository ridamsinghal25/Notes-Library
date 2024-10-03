import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  NotepadText,
  Plus,
} from "lucide-react";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AVATAR_URL } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarUploadModalContainer from "../modals/avatarmodal/container/AvatarUploadModalContainer";
import { useDispatch } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";

function ProfileOverviwPanel({ userDetails }) {
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
  const dispatch = useDispatch();

  function toggleSubjects() {
    setIsSubjectsOpen(!isSubjectsOpen);
  }

  const toggleAvatarUploadModal = () => {
    dispatch(toggleModal({ modalType: "avatarUploadModal" }));
  };

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
                  className="rounded-full hover:opacity-90 transition-opacity duration-300"
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

        <div className="mt-2 shadow-md hover:shadow-xl transition-shadow dark:border-t-2 border-t-2 dark:shadow-gray-300 duration-300 rounded-lg p-2 lg:p-6">
          <Collapsible>
            <CollapsibleTrigger className="w-full">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Academic Information
              </h4>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-4 mt-3 sm:space-y-6">
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 dark:text-gray-200" />
                  <div>
                    <p className="text-sm text-start text-gray-600 dark:text-gray-200">
                      Course
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {userDetails?.course[0]?.courseName}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={toggleSubjects}
                    className="w-full flex items-center justify-between p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center">
                      <NotepadText className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        Subjects
                      </p>
                    </div>
                    {isSubjectsOpen ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  <div
                    className={`${isSubjectsOpen ? "block" : "hidden"} mt-4`}
                  >
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
                      {userDetails?.course[0]?.subjects.map((subject) => (
                        <li
                          key={subject}
                          className="flex items-center p-2 lg:-mx-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-400"
                        >
                          <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-4 flex-shrink-0">
                            <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                          </div>
                          <span className="text-gray-800 font-medium text-base text-start dark:text-gray-200">
                            {subject}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </aside>
  );
}

export default ProfileOverviwPanel;
