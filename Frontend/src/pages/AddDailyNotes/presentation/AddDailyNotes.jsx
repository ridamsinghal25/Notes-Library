import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ChevronUp, ChevronDown, X, Upload, ArrowLeft } from "lucide-react";
import FormFieldInput from "@/components/basic/FormFieldInput";
import FormFieldSelect from "@/components/basic/FormFieldSelect";

function AddDailyNotes({
  dailyNotesForm,
  onSubmit,
  handleFileChange,
  moveFile,
  removeFile,
  files,
  userSubjects,
}) {
  const fileInputRef = useRef(null);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto rounded-lg border border-gray-400 dark:border-gray-200 shadow-lg">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {}}
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
            onSubmit={dailyNotesForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-6 p-4 sm:p-6">
              <FormFieldSelect
                form={dailyNotesForm}
                label="Subject Name"
                name="subject"
                values={userSubjects}
                placeholder="Enter the subject name"
              />
              <FormFieldInput
                form={dailyNotesForm}
                label="Chapter No."
                name="chapterNumber"
                placeholder="Enter the chapter number"
              />
              <FormFieldInput
                form={dailyNotesForm}
                label="Chapter Name"
                name="chapterName"
                placeholder="Enter the chapter name"
                className="md:col-span-2"
              />
            </div>

            <div className="p-4 sm:p-6">
              <FormFieldInput
                form={dailyNotesForm}
                id="upload-files"
                name="files"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
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

              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Uploaded Files ({files.length})
                  </h3>
                  <ul className="">
                    {files.map((file, index) => (
                      <li
                        key={file.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-200 dark:hover:bg-gray-700 gap-2"
                      >
                        <span className="min-w-0 flex-1 truncate text-sm text-gray-700 dark:text-gray-300">
                          {file.file.name}
                        </span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFile(file.id, "up")}
                            disabled={index === 0}
                            className="h-8 w-8"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => moveFile(file.id, "down")}
                            disabled={index === files.length - 1}
                            className="h-8 w-8"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(file.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end p-4 sm:p-6 border-t dark:border-gray-700">
              <Button type="submit">Upload Files</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddDailyNotes;
