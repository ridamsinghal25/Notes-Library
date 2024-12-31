import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DELETE_MODAL_DESCRIPTION,
  DELETE_MODAL_HEADING,
} from "@/constants/constants";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { deleteCourseFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";

function DeleteCourseModal({
  showDialog,
  setShowDialog,
  isDeleting,
  onSubmit,
}) {
  const deleteCourseForm = useForm({
    resolver: zodResolver(deleteCourseFormValidation),
    defaultValues: {
      password: "",
    },
  });

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent className="max-w-xs sm:max-w-md rounded-lg  [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:border-gray-400">
        <AlertDialogHeader>
          <AlertDialogTitle>{DELETE_MODAL_HEADING}</AlertDialogTitle>
          <AlertDialogDescription>
            {DELETE_MODAL_DESCRIPTION}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...deleteCourseForm}>
          <form
            onSubmit={deleteCourseForm.handleSubmit((data) =>
              onSubmit(data).then(() => deleteCourseForm.reset())
            )}
            className="space-y-8"
          >
            <FormFieldInput
              form={deleteCourseForm}
              label="Password"
              name="password"
              placeholder="Enter your current password"
              type="password"
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

export default DeleteCourseModal;
