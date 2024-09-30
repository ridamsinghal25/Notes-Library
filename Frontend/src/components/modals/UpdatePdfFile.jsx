import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  UPDATE_PDF_BUTTON_TEXT,
  UPDATE_PDF_DESCRIPTION,
  UPDATE_PDF_TITLE,
} from "@/constants/constants";
import { pdfFileValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import FormFieldInput from "../FormFieldInput";

export function UpdatePdfFile({
  showDialog,
  setShowDialog,
  onSubmit,
  isSubmitting,
}) {
  const updatePdfFileForm = useForm({
    resolver: zodResolver(pdfFileValidation),
    defaultValues: {
      pdfFile: null,
    },
  });

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent
        className="max-w-96 sm:max-w-[425px] rounded-lg [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:border-gray-400"
        hideClose
      >
        <DialogHeader className="flex flex-row justify-between items-center space-y-0">
          <DialogTitle>{UPDATE_PDF_TITLE}</DialogTitle>
          <DialogClose asChild>
            <Button className="h-7 w-7 p-0 mr-2" variant="ghost">
              <X size={20} />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription>{UPDATE_PDF_DESCRIPTION}</DialogDescription>
        <Form {...updatePdfFileForm}>
          <form
            onSubmit={updatePdfFileForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormFieldInput
              form={updatePdfFileForm}
              label="PDF File"
              name="pdfFile"
              type="file"
              placeholder="Please select a PDF file"
              className="dark:border-gray-300"
            />
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait...
                  </>
                ) : (
                  UPDATE_PDF_BUTTON_TEXT
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
