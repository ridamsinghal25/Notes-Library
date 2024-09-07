import { Button } from "../components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import UploadNotes from "../components/modals/UploadNotes";
import {
  NOTES_PAGE_DESCRIPTION_ONE,
  NOTES_PAGE_DESCRIPTION_TWO,
  NOTES_PAGE_HEADING,
} from "@/constants/constants";
import NotesCard from "@/components/NotesCard";
import { useSelector } from "react-redux";
import { USER_ROLE } from "@/constants/constants";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";

function NotesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const userSubjects = useSelector(
    (state) => state.auth.userDetails?.course[0]?.subjects
  );

  const userRole = useSelector((state) => state.auth.userDetails?.role);

  function handleClick() {
    setShowUploadModal(true);
  }

  const onNotesUpload = async (data) => {
    setIsSubmitting(true);

    const response = await NotesService.uploadNotes(data);

    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message, {
        autoClose: 2000,
      });
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
    }

    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {userRole === USER_ROLE.ADMIN ? (
        <>
          <div className="fixed top-4 right-4 z-10">
            <Button onClick={handleClick}>
              <Upload />
            </Button>
          </div>
          <UploadNotes
            showDialog={showUploadModal}
            setShowDialog={setShowUploadModal}
            title={"Upload"}
            onSubmit={onNotesUpload}
            isSubmitting={isSubmitting}
          />
        </>
      ) : null}

      <header className="p-4 lg:p-6">
        <h1 className="text-lg font-semibold md:text-2xl">
          {NOTES_PAGE_HEADING}
        </h1>
      </header>

      <main className="flex-grow flex p-4 lg:p-6">
        <div className="w-full flex items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center p-8">
            <h3 className="text-2xl font-bold tracking-tight">
              {NOTES_PAGE_DESCRIPTION_ONE}
            </h3>
            <p className="text-sm text-muted-foreground">
              {NOTES_PAGE_DESCRIPTION_TWO}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {userSubjects?.map((subject) => {
                return <NotesCard subject={subject} key={subject} />;
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotesPage;
