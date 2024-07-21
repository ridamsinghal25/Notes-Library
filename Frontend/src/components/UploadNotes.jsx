import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { X } from "lucide-react";

import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import FormFieldInput from "./FormFieldInput";
import {
  BUTTON_TEXTS,
  DIALOG_DESCRIPTION,
  DIALOG_TITLE,
  FIELD_NAMES,
  FORM_FIELD_LABELS,
  FORM_FIELD_PLACEHOLDERS,
} from "../constants/uploadPage";

function UploadNotes({ showDialog, setShowDialog }) {
  const uploadNotesForm = useForm({
    defaultValues: {
      [FIELD_NAMES.subject]: "",
      [FIELD_NAMES.chapterNumber]: "",
      [FIELD_NAMES.chapterName]: "",
      [FIELD_NAMES.notes]: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent
        className="w-[95vw] max-w-[425px] sm:max-w-[550px] md:max-w-[650px] lg:max-w-[750px] xl:max-w-[900px] sm:w-full p-4 sm:p-6 md:p-8"
        hideClose
      >
        <DialogHeader className="flex flex-row justify-between items-center space-y-0">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {DIALOG_TITLE}
          </DialogTitle>
          <DialogClose asChild>
            <Button className="h-7 w-7 p-0" variant="ghost">
              <X size={15} />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="text-sm sm:text-base md:text-lg mb-4">
          {DIALOG_DESCRIPTION}
        </DialogDescription>
        <Form {...uploadNotesForm}>
          <form
            onSubmit={uploadNotesForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormFieldInput
              form={uploadNotesForm}
              label={FORM_FIELD_LABELS.subject}
              name={FIELD_NAMES.subject}
              placeholder={FORM_FIELD_PLACEHOLDERS.subject}
            />
            <FormFieldInput
              form={uploadNotesForm}
              label={FORM_FIELD_LABELS.chapterNumber}
              name={FIELD_NAMES.chapterNumber}
              placeholder={FORM_FIELD_PLACEHOLDERS.chapterNumber}
            />
            <FormFieldInput
              form={uploadNotesForm}
              label={FORM_FIELD_LABELS.chapterName}
              name={FIELD_NAMES.chapterName}
              placeholder={FORM_FIELD_PLACEHOLDERS.chapterName}
            />
            <FormFieldInput
              form={uploadNotesForm}
              label={FORM_FIELD_LABELS.notes}
              name={FIELD_NAMES.notes}
              placeholder={FORM_FIELD_PLACEHOLDERS.notes}
              type="file"
              accept=".pdf"
            />
            <Button type="submit">{BUTTON_TEXTS}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadNotes;
