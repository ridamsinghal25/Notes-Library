import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {
  NOTES_PAGE_DESCRIPTION_ONE,
  NOTES_PAGE_DESCRIPTION_TWO,
  NOTES_PAGE_HEADING,
} from "@/constants/constants";
import { UserRolesEnum } from "@/constants/constants";
import NotesCardContainer from "@/components/pageComponent/NotesCard/container/NotesCardContainer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/route";

function NotesPage({ userSubjects, userRole }) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <HelmetProvider>
        <Helmet>
          <title>Notes</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a notes page" />
        </Helmet>
      </HelmetProvider>
      {userRole === UserRolesEnum.ADMIN ? (
        <>
          <div className="absolute top-4 right-4 z-10">
            <Link to={ROUTES.UPLOAD_NOTES}>
              <Button>
                <Upload />
              </Button>
            </Link>
          </div>
        </>
      ) : null}

      <header className="mt-4 p-4 lg:p-6">
        <h1 className="text-lg font-semibold md:text-2xl">
          {NOTES_PAGE_HEADING}
        </h1>
      </header>

      <main className="flex-grow flex p-4 lg:p-6">
        <div className="w-full flex items-center justify-center rounded-lg border shadow-sm border-gray-400">
          <div className="flex flex-col items-center gap-4 text-center p-8">
            <h3 className="text-2xl font-bold tracking-tight">
              {NOTES_PAGE_DESCRIPTION_ONE}
            </h3>
            <p className="text-sm text-muted-foreground">
              {NOTES_PAGE_DESCRIPTION_TWO}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {userSubjects?.map((subject) => {
                return <NotesCardContainer subject={subject} key={subject} />;
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotesPage;
