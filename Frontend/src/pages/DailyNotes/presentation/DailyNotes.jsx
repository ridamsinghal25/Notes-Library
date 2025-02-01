import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DAILY_NOTES_PAGE_DESCRIPTION_ONE,
  DAILY_NOTES_PAGE_DESCRIPTION_TWO,
  DAILY_NOTES_PAGE_HEADING,
  UserRolesEnum,
} from "@/constants/constants";
import { ROUTES } from "@/constants/route";

function DailyNotes({ subjectChapters, userRole }) {
  return (
    <div>
      {userRole === UserRolesEnum.ADMIN || UserRolesEnum.MODERATOR ? (
        <>
          <div className="absolute top-4 right-4 z-10">
            <Link to={ROUTES.ADD_DAILY_NOTES}>
              <Button>
                <Upload />
              </Button>
              ̦
            </Link>
          </div>
        </>
      ) : null}

      <header className="mt-4 p-4 lg:p-6">
        <h1 className="text-lg font-semibold md:text-2xl">
          {DAILY_NOTES_PAGE_HEADING}
        </h1>
      </header>

      <main className="flex-grow flex p-4 lg:p-6">
        <div className="w-full flex items-center justify-center rounded-lg border shadow-sm border-gray-400">
          <div className="flex flex-col items-center gap-4 text-center p-8">
            <h3 className="text-2xl font-bold tracking-tight">
              {DAILY_NOTES_PAGE_DESCRIPTION_ONE}
            </h3>
            <p className="text-sm text-muted-foreground">
              {DAILY_NOTES_PAGE_DESCRIPTION_TWO}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {subjectChapters?.map((chapter) => {
                return (
                  <div key={chapter} className="space-y-6">
                    <Link
                      to={`/notes/${chapter}`}
                      className="border border-gray-400 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg block"
                    >
                      <h4 className="font-semibold text-lg text-gray-800 mb-2 dark:text-gray-200 truncate">
                        {chapter}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-200 mb-4">
                        {chapter} recents notes for effective learning.
                      </p>
                      <Button>View Notes</Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default DailyNotes;
