import { BookOpen, ChevronDown, ChevronUp, NotepadText } from "lucide-react";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function CollapsibleComponent({ toggleSubjects, isSubjectsOpen, userDetails }) {
  return (
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
                  {userDetails?.course?.courseName}
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
              <div className={`${isSubjectsOpen ? "block" : "hidden"} mt-4`}>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
                  {userDetails?.course?.subjects.map((subject) => (
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
  );
}

export default CollapsibleComponent;
