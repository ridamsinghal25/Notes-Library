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
import FormFieldInput from "@/components/FormFieldInput";
import { SUBMIT_BUTTON } from "@/constants/constants";
import { uploadNotesValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import FormFieldSelect from "../FormFieldSelect";

function UploadNotes({ showDialog, setShowDialog, title, notesInfo }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userSubjects = useSelector((state) => state.auth.userDetails);

  const uploadNotesForm = useForm({
    resolver: zodResolver(uploadNotesValidation),
    defaultValues: {
      subject: notesInfo?.subject || "",
      chapterNumber: `${notesInfo?.chapterNumber || ""}`,
      chapterName: notesInfo?.chapterName || "",
      pdfFile: {},
      owner: notesInfo?.owner || "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    let response;

    if (notesInfo?._id) {
      response = await NotesService.updateNotes(notesInfo._id, data);
    } else {
      response = await NotesService.uploadNotes(data);
    }
    setIsSubmitting(false);

    if (!(response instanceof ApiError)) {
      toast.success(response?.message, {
        autoClose: 2000,
      });
      setShowDialog(false);

      if (notesInfo?._id) {
        setTimeout(() => window.location.reload(), 2000);
      }
    } else {
      toast.error(response?.errorResponse?.message || response?.errorMessage);
      setShowDialog(false);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-h-[80vh] overflow-y-auto" hideClose>
        <DialogHeader className="flex flex-row justify-between items-center space-y-0">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {title} Notes
          </DialogTitle>
          <DialogClose asChild>
            <Button className="h-7 w-7 p-0" variant="ghost">
              <X size={15} />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="text-sm sm:text-base md:text-lg mb-4">
          {title} Notes to website
        </DialogDescription>
        <Form {...uploadNotesForm}>
          <form
            onSubmit={uploadNotesForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormFieldSelect
              form={uploadNotesForm}
              label="Subject Name"
              name="subject"
              values={userSubjects?.course[0]?.subjects}
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
              name="pdfFile"
              placeholder="Upload your notes"
              type="file"
              accept=".pdf"
            />
            <FormFieldInput
              form={uploadNotesForm}
              label="Owner"
              name="owner"
              placeholder="Notes owner"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : (
                SUBMIT_BUTTON
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadNotes;
