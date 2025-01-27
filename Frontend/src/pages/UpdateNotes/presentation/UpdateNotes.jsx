import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Loader2 } from "lucide-react";
import FormFieldSelect from "@/components/basic/FormFieldSelect";
import FormFieldInput from "@/components/basic/FormFieldInput";
import {
  pdfFileValidation,
  updateNotesValidation,
} from "@/validation/zodValidation";

function UpdateNotes({
  userSubjects,
  selectedNotes,
  isSubmitting,
  onNotesUpdate,
  onPdfFileUpdate,
  navigate,
}) {
  const updateNotesForm = useForm({
    resolver: zodResolver(updateNotesValidation),
    defaultValues: {
      subject: selectedNotes?.subject || "",
      chapterNumber: `${selectedNotes?.chapterNumber}` || "",
      chapterName: selectedNotes?.chapterName || "",
      owner: selectedNotes?.owner || "",
    },
  });

  const updatePdfFileForm = useForm({
    resolver: zodResolver(pdfFileValidation),
    defaultValues: {
      pdfFile: null,
    },
  });

  return (
    <div className="min-h-screen p-6 md:p-8 mt-7">
      <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-xl backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Update Notes
            </h1>
          </div>
          <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
            Refine your knowledge
          </div>
        </div>

        <Tabs defaultValue="notesDetails" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="notesDetails">Note Details</TabsTrigger>
            <TabsTrigger value="updatePdf">Update PDF</TabsTrigger>
          </TabsList>

          <TabsContent value="notesDetails">
            <Form {...updateNotesForm}>
              <form
                onSubmit={updateNotesForm.handleSubmit((data) =>
                  onNotesUpdate(data).then(() => {
                    updateNotesForm.reset();
                  })
                )}
                className="space-y-6"
              >
                <FormFieldSelect
                  form={updateNotesForm}
                  label="Subject Name"
                  name="subject"
                  values={userSubjects}
                  placeholder="Enter the subject name"
                />
                <FormFieldInput
                  form={updateNotesForm}
                  label="Chapter No."
                  name="chapterNumber"
                  placeholder="Enter the chapter number"
                />
                <FormFieldInput
                  form={updateNotesForm}
                  label="Chapter Name"
                  name="chapterName"
                  placeholder="Enter the chapter name"
                />
                <FormFieldInput
                  form={updateNotesForm}
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
                      "Update Details"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="updatePdf">
            <Form {...updatePdfFileForm}>
              <form
                onSubmit={updatePdfFileForm.handleSubmit((data) =>
                  onPdfFileUpdate(data).then(() => {
                    updatePdfFileForm.reset();
                  })
                )}
                className="space-y-10 mt-10"
              >
                <FormFieldInput
                  form={updatePdfFileForm}
                  label="Update Notes (PDF)"
                  name="pdfFile"
                  placeholder="Upload your updated notes"
                  type="file"
                  onChange={() =>
                    updatePdfFileForm.setValue(
                      "pdfFile",
                      ...updatePdfFileForm.getValues("pdfFile")
                    )
                  }
                  accept=".pdf"
                  className="dark:bg-gray-300 dark:text-black"
                />
                <div className="w-full flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                        Wait
                      </>
                    ) : (
                      "Update PDF"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default UpdateNotes;
