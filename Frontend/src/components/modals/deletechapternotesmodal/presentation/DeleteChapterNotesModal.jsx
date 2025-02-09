import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DELETE_MODAL_DESCRIPTION } from "@/constants/constants";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldSelect from "@/components/basic/FormFieldSelect";
import { deleteChapterNotesFormValidation } from "@/validation/zodValidation";

function DeleteChapterNotesModal({
  showDialog,
  setShowDialog,
  isDeleting,
  onSubmit,
  userSubjects,
  getSubjectChapters,
  currentSubjectChapters,
}) {
  const deleteChapterNotesForm = useForm({
    resolver: zodResolver(deleteChapterNotesFormValidation),
    defaultValues: {
      subject: "",
      chapterName: "",
    },
  });
  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent className="max-w-xs sm:max-w-md rounded-lg  [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:border-gray-400">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete all notes?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {DELETE_MODAL_DESCRIPTION}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...deleteChapterNotesForm}>
          <form
            onSubmit={deleteChapterNotesForm.handleSubmit((data) =>
              onSubmit(data).then(() => deleteChapterNotesForm.reset())
            )}
            className="space-y-8"
          >
            <div className="space-y-6 p-4 sm:p-6">
              <FormFieldSelect
                form={deleteChapterNotesForm}
                label="Subject Name"
                name="subject"
                values={userSubjects?.map((subject) => subject.subjectName)}
                placeholder="Enter the subject name"
              />

              <FormFieldSelect
                form={deleteChapterNotesForm}
                label="Chapter Name"
                name="chapterName"
                values={currentSubjectChapters}
                onOpenChange={() =>
                  getSubjectChapters(
                    deleteChapterNotesForm.getValues("subject")
                  )
                }
                placeholder="Enter the subject name"
                disabled={!deleteChapterNotesForm.getValues("subject")}
                description="Select a subject first"
              />
            </div>
            <AlertDialogFooter className="flex flex-row space-x-2 sm:flex-none">
              <AlertDialogCancel className="bg-amber-100 text-violet-800 hover:bg-amber-200 hover:text-black flex-1 sm:flex-none">
                Cancel
              </AlertDialogCancel>
              <Button
                className="bg-red-400 hover:bg-red-600 flex-1 mt-2 sm:mt-0 sm:flex-none"
                disabled={isDeleting}
                type="submit"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteChapterNotesModal;
