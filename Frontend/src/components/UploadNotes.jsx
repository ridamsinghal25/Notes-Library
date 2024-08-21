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
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/FormFieldInput";
import {
  BUTTON_TEXTS,
  DIALOG_DESCRIPTION,
  DIALOG_TITLE,
} from "@/constants/uploadPage";
import { uploadNotesValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";

function UploadNotes({ showDialog, setShowDialog }) {
  const uploadNotesForm = useForm({
    resolver: zodResolver(uploadNotesValidation),
    defaultValues: {
      subject: "",
      chapterNumber: "",
      chapterName: "",
      notes: "",
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
              label="Subject Name"
              name="subject"
              placeholder="Enter the subject name"
            />
            <FormFieldInput
              form={uploadNotesForm}
              label="Chapter No."
              name="chapterNumber"
              placeholder="Enter the chapter number"
            />
            <FormFieldInput
              form={uploadNotesForm}
              label="Chapter Name"
              name="chapterName"
              placeholder="Enter the chapter name"
            />
            <FormFieldInput
              form={uploadNotesForm}
              label="Notes"
              name="notes"
              placeholder="Upload your notes"
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
