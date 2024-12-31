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
import { deleteSubjectNotesFormValidation } from "@/validation/zodValidation";

function DeleteSubjectNotesModal({
  showDialog,
  setShowDialog,
  isDeleting,
  onSubmit,
  userSubjects,
}) {
  const deleteSubjectNotesForm = useForm({
    resolver: zodResolver(deleteSubjectNotesFormValidation),
    defaultValues: {
      pdfFile: null,
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
        <Form {...deleteSubjectNotesForm}>
          <form
            onSubmit={deleteSubjectNotesForm.handleSubmit((data) =>
              onSubmit(data).then(() => deleteSubjectNotesForm.reset())
            )}
            className="space-y-8"
          >
            <FormFieldSelect
              form={deleteSubjectNotesForm}
              label="Subject Name"
              name="subject"
              values={userSubjects}
              placeholder="Enter the subject name"
            />
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

export default DeleteSubjectNotesModal;
