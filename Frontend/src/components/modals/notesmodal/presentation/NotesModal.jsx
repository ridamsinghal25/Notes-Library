import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Loader2, X } from "lucide-react";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/basic/FormFieldInput";
import {
  uploadNotesValidation,
  updateNotesValidation,
} from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldSelect from "@/components/basic/FormFieldSelect";

function NotesModal({
  showDialog,
  setShowDialog,
  selectedNotes,
  onSubmit,
  isSubmitting,
  isUpdateMode = false,
  userSubjects,
}) {
  const currentValidationSchema = isUpdateMode
    ? updateNotesValidation
    : uploadNotesValidation;

  const uploadNotesForm = useForm({
    resolver: zodResolver(currentValidationSchema),
    defaultValues: {
      subject: selectedNotes?.subject || "",
      chapterNumber: `${selectedNotes?.chapterNumber || ""}`,
      chapterName: selectedNotes?.chapterName || "",
      pdfFile: null,
      owner: selectedNotes?.owner || "",
    },
  });

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent
        className="max-h-[80vh] max-w-xs sm:max-w-md rounded-lg overflow-y-auto [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:border-gray-400"
        hideClose
      >
        <DialogHeader className="flex flex-row justify-between items-center space-y-0">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {isUpdateMode ? "Update" : "Upload"} Notes
          </DialogTitle>
          <DialogClose asChild>
            <Button className="h-7 w-7 p-0" variant="ghost">
              <X size={15} />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="text-sm sm:text-base md:text-lg mb-4">
          {isUpdateMode ? "Update" : "Upload"} Notes to website
        </DialogDescription>
        <Form {...uploadNotesForm}>
          <form
            onSubmit={uploadNotesForm.handleSubmit((data) =>
              onSubmit(data).then(() => {
                uploadNotesForm.reset();
              })
            )}
            className="space-y-8"
          >
            <FormFieldSelect
              form={uploadNotesForm}
              label="Subject Name"
              name="subject"
              values={userSubjects}
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
            {!isUpdateMode && (
              <FormFieldInput
                form={uploadNotesForm}
                label="Notes"
                name="pdfFile"
                placeholder="Upload your notes"
                type="file"
                accept=".pdf"
                className="dark:bg-gray-300 dark:text-black"
              />
            )}
            <FormFieldInput
              form={uploadNotesForm}
              label="Owner"
              name="owner"
              placeholder="Notes owner"
            />
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default NotesModal;
