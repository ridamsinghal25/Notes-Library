import { Button } from "@/components/ui/button";
import FormFieldInput from "@/components/basic/FormFieldInput";
import FormFieldSelect from "@/components/basic/FormFieldSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { ArrowLeft, Loader2 } from "lucide-react";
import { uploadNotesValidation } from "@/validation/zodValidation";
import { ROUTES } from "@/constants/route";
import { Link } from "react-router-dom";

function UploadNotes({
  userSubjects,
  isSubmitting,
  onSubmit,
  currentSubjectChapters,
  getSubjectChapters,
}) {
  const uploadNotesForm = useForm({
    resolver: zodResolver(uploadNotesValidation),
    defaultValues: {
      subject: "",
      chapterNumber: "",
      chapterName: "",
      pdfFile: "",
      owner: "",
    },
  });

  return (
    <div className="min-h-screen p-6 md:p-8 mt-7">
      <div className="max-w-4xl mx-auto border border-gray-400 dark:border-gray-200 rounded-lg shadow-xl backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Link to={ROUTES.NOTES}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Go back"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Upload Notes
            </h1>
          </div>
          <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
            Share your knowledge
          </div>
        </div>
        <Form {...uploadNotesForm}>
          <form
            onSubmit={uploadNotesForm.handleSubmit((data, event) =>
              onSubmit(data).then(() => {
                event.target.reset();
                uploadNotesForm.reset();
              })
            )}
            className="space-y-6"
          >
            <FormFieldSelect
              form={uploadNotesForm}
              label="Subject Name"
              name="subject"
              values={userSubjects?.map((subject) => subject.subjectName)}
              placeholder="Enter the subject name"
            />
            <FormFieldInput
              form={uploadNotesForm}
              label="Chapter No."
              name="chapterNumber"
              placeholder="Enter the chapter number"
              type="number"
              min={1}
              max={10}
            />
            <FormFieldSelect
              form={uploadNotesForm}
              label="Chapter Name"
              name="chapterName"
              placeholder="Enter the chapter name"
              values={currentSubjectChapters}
              onOpenChange={() =>
                getSubjectChapters(uploadNotesForm.getValues("subject"))
              }
              disabled={!uploadNotesForm.getValues("subject")}
              description="Select a subject first"
            />
            <FormFieldInput
              form={uploadNotesForm}
              label="Notes"
              name="pdfFile"
              placeholder="Upload your notes"
              type="file"
              accept=".pdf"
              onChange={() =>
                uploadNotesForm.setValue(
                  "pdfFile",
                  ...uploadNotesForm.getValues("pdfFile")
                )
              }
              className="dark:bg-gray-300 dark:text-black"
            />
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
      </div>
    </div>
  );
}

export default UploadNotes;
