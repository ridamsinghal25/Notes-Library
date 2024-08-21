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
import FormFieldSelect from "@/components/FormFieldSelect";
import { SEMESTER_OPTIONS } from "@/constants/auth";
import { BUTTONS, UPDATE_SEMESTER_TEXT_CONTENT } from "@/constants/account";
import { updateSemesterFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";

export function UpdateSemester({ showDialog, setShowDialog }) {
  const updateSemesterForm = useForm({
    resolver: zodResolver(updateSemesterFormValidation),
    defaultValues: {
      semester: "",
    },
  });

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{UPDATE_SEMESTER_TEXT_CONTENT.TITLE}</DialogTitle>
          <DialogDescription>
            {UPDATE_SEMESTER_TEXT_CONTENT.DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        <Form {...updateSemesterForm}>
          <form
            onSubmit={updateSemesterForm.handleSubmit()}
            className="space-y-8"
          >
            <FormFieldSelect
              form={updateSemesterForm}
              label="Semester"
              name="semester"
              values={SEMESTER_OPTIONS}
              placeholder="Select your semester"
            />
            <Button type="submit">{BUTTONS.UPDATE_SEMESTER}</Button>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
