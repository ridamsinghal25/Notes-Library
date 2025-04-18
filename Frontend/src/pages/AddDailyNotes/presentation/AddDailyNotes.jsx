import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Upload, ArrowLeft, Loader2 } from "lucide-react";
import FormFieldInput from "@/components/basic/FormFieldInput";
import FormFieldSelect from "@/components/basic/FormFieldSelect";
import { Helmet, HelmetProvider } from "react-helmet-async";
import UploadFileList from "@/components/pageComponent/UploadFileList/presentation/UploadFileList";

function AddDailyNotes({
  dailyNotesForm,
  onNotesCreate,
  handleFileChange,
  moveFile,
  removeFile,
  files,
  userSubjects,
  getSubjectChapters,
  currentSubjectChapters,
  isSubmitting,
  navigate,
}) {
  const fileInputRef = useRef(null);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <HelmetProvider>
        <Helmet>
          <title>Add Daily Notes</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a add daily notes page" />
        </Helmet>
      </HelmetProvider>
      <div className="max-w-4xl mx-auto rounded-lg border border-gray-400 dark:border-gray-200 shadow-lg">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b dark:border-gray-700">
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
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Add Today's Work
            </h1>
          </div>
        </div>

        <Form {...dailyNotesForm}>
          <form
            onSubmit={dailyNotesForm.handleSubmit((data, event) =>
              onNotesCreate(data).then(() => {
                event.target.reset();
                dailyNotesForm.reset();
              })
            )}
            className="space-y-6"
          >
            <div className="space-y-6 p-4 sm:p-6">
              <FormFieldSelect
                form={dailyNotesForm}
                label="Subject Name"
                name="subject"
                values={userSubjects?.map((subject) => subject.subjectName)}
                placeholder="Enter the subject name"
              />
              <FormFieldInput
                form={dailyNotesForm}
                label="Chapter No."
                name="chapterNumber"
                placeholder="Enter the chapter number"
              />
              <FormFieldSelect
                form={dailyNotesForm}
                label="Chapter Name"
                name="chapterName"
                values={currentSubjectChapters}
                onOpenChange={() =>
                  getSubjectChapters(dailyNotesForm.getValues("subject"))
                }
                placeholder="Enter the subject name"
                disabled={!dailyNotesForm.getValues("subject")}
                description="Select a subject first"
              />
            </div>

            <div className="p-4 sm:p-6">
              <FormFieldInput
                form={dailyNotesForm}
                id="upload-files"
                name="files"
                type="file"
                accept=" image/jpg, image/jpeg"
                multiple
                onChange={(event) => handleFileChange(event, files)}
                className="hidden"
              />
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                onClick={handleUploadClick}
              >
                <label htmlFor="upload-files" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Drag and drop files here or click to upload
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PDF, DOC, DOCX up to 10MB each
                  </p>
                </label>
              </div>

              <UploadFileList
                formFiles={files}
                moveFile={moveFile}
                removeFile={removeFile}
              />
            </div>

            <div className="flex justify-end p-4 sm:p-6 border-t dark:border-gray-700">
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

export default AddDailyNotes;
