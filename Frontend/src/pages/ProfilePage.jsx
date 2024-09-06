import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  NotepadText,
  ThumbsUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AuthService from "@/services/AuthService";
import { toast } from "react-toastify";
import ApiError from "@/services/ApiError";
import { getPreviewImageUrl } from "@/utils/getImageUrl";
import { useSelector } from "react-redux";

function ProfilePage() {
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
  const [userNotesInfo, setUserNotesInfo] = useState([]);
  const userDetails = useSelector((state) => state.auth.userDetails);

  useEffect(() => {
    const fetchUserProfileInfo = async () => {
      const response = await AuthService.getUserProfile();

      if (!(response instanceof ApiError)) {
        toast.success(response?.message);
        setUserNotesInfo(response?.data);
      } else {
        toast.error(response?.errorResponse?.message || response?.errorMessage);
      }
    };

    fetchUserProfileInfo();
  }, []);

  function toggleSubjects() {
    setIsSubjectsOpen(!isSubjectsOpen);
  }
  return (
    <div className="bg-white text-gray-900">
      <header className="border-b hidden lg:block  border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif md:text-3xl lg:text-4xl font-bold">
            {userDetails?.fullName}
          </h1>
        </div>
        <Separator />
      </header>

      <main className="container mx-auto gap-10 px-4 lg:px-16 lg:py-8 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-bold underline mb-4">
            Your Uploaded Notes
          </h2>
          {userNotesInfo?.map((user) => (
            <article
              key={user?._id}
              className="border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 pb-8 mt-4 flex justify-between items-start px-6 sm:p-6 bg-white"
            >
              <div className="w-3/4">
                <div className="flex items-center mb-4 mt-4">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Author Avatar"
                    className="w-9 h-9 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {userDetails?.fullName}
                    </p>
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-gray-900 hover:text-gray-700 transition-colors duration-300">
                  {user?.chapterName}
                </h2>
                <p className="text-gray-700 mb-4 font-medium">
                  {user?.subject}
                </p>
                <div className="flex flex-wrap gap-4 md:gap-10 items-center mt-7">
                  <div className="flex items-center gap-2">
                    <div>
                      <ThumbsUp />
                    </div>
                    {user?.likesCount}
                  </div>
                </div>
              </div>
              <div>
                <img
                  src={getPreviewImageUrl(user?.pdf?.url)}
                  alt="Notes Image"
                  className="max-w-28 sm:max-w-36 h-auto rounded-lg mt-8 sm:mt-0 sm:ml-4 shadow-lg object-cover border border-gray-300 hover:opacity-90 transition-opacity duration-300"
                />
              </div>
            </article>
          ))}
        </div>
        <div className="border-b-2 lg:border-r-2"></div>
        <aside className="w-full lg:w-1/3 lg:mt-9 relative lg:pl-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center relative">
            <div className="flex lg:flex-col gap-4">
              <div>
                <img
                  src="https://github.com/shadcn.png"
                  alt="Profile Image"
                  className="rounded-full mx-auto mb-4 w-16 h-16 lg:w-32 lg:h-32 shadow-lg hover:opacity-90 transition-opacity duration-300"
                />
              </div>
              <div className="">
                <h3 className="text-xl font-serif font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300 mt-4 lg:mt-0">
                  {userDetails?.fullName}
                </h3>
              </div>
            </div>
            <div className="mt-2 bg-gray-50 rounded-lg p-2 lg:p-6 shadow-inner">
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <h4 className="text-xl font-semibold text-gray-800">
                    Academic Information
                  </h4>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-4 mt-3 sm:space-y-6">
                    <div className="flex items-center">
                      <BookOpen className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-start text-gray-600">
                          Course
                        </p>
                        <p className="font-medium text-gray-800">
                          {userDetails?.course[0]?.courseName}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={toggleSubjects}
                        className="w-full flex items-center justify-between bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex items-center">
                          <NotepadText className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                          <p className="font-medium text-gray-800">Subjects</p>
                        </div>
                        {isSubjectsOpen ? <ChevronUp /> : <ChevronDown />}
                      </button>
                      <div
                        className={`${
                          isSubjectsOpen ? "block" : "hidden"
                        } mt-4`}
                      >
                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
                          {userDetails?.course[0]?.subjects.map((subject) => (
                            <li
                              key={subject}
                              className="flex items-center bg-white p-2 lg:-mx-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                            >
                              <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-4 flex-shrink-0">
                                <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                              </div>
                              <span className="text-gray-800 font-medium text-base text-start">
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
      </main>
    </div>
  );
}

export default ProfilePage;
