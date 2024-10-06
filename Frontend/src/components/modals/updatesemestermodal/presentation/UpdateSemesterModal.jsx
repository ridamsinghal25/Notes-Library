import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldSelect from "@/components/basic/FormFieldSelect";
import {
  UPDATE_SEMESTER_TEXT_CONTENT,
  SEMESTER_OPTIONS,
} from "@/constants/constants";
import { updateSemesterFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

function UpdateSemesterModal({
  showDialog,
  setShowDialog,
  isUpdating,
  onSubmit,
}) {
  const updateSemesterForm = useForm({
    resolver: zodResolver(updateSemesterFormValidation),
    defaultValues: {
      semester: "",
    },
  });

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-w-96 sm:max-w-[425px] rounded-lg [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:border-gray-400">
        <DialogHeader className="text-start">
          <DialogTitle>{UPDATE_SEMESTER_TEXT_CONTENT.TITLE}</DialogTitle>
          <DialogDescription>
            {UPDATE_SEMESTER_TEXT_CONTENT.DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        <Form {...updateSemesterForm}>
          <form
            onSubmit={updateSemesterForm.handleSubmit((data) =>
              onSubmit(data).then(() => updateSemesterForm.reset())
            )}
            className="space-y-8"
          >
            <FormFieldSelect
              form={updateSemesterForm}
              label="Semester"
              name="semester"
              values={SEMESTER_OPTIONS}
              placeholder="Select your semester"
            />
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateSemesterModal;
