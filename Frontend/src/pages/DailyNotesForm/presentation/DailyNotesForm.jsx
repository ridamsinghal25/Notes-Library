import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ChevronUp, ChevronDown, X, Upload, ArrowLeft } from "lucide-react";
import FormFieldInput from "@/components/basic/FormFieldInput";

function DailyNotesForm({
  dailyNotesForm,
  onSubmit,
  handleFileChange,
  moveFile,
  removeFile,
  files,
}) {
  const fileInputRef = useRef(null);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full flex flex-col justify-center max-w-2xl mx-auto  shadow-md rounded-lg overflow-hidden border-2  border-gray-200 dark:border-gray-200 p-4">
        <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-gray-700">
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
            <div className="hidden sm:block text-lg text-black dark:text-gray-200">
              Add Today's Work
            </div>
          </div>
        </div>
        <Form {...dailyNotesForm}>
          <form onSubmit={dailyNotesForm.handleSubmit(onSubmit)}>
            <div className="px-6 py-4 border-b border-gray-900 dark:border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Multiple File Upload
              </h2>
            </div>
            <div className="p-6">
              <FormFieldInput
                form={dailyNotesForm}
                id="upload-files"
                name="files"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-900 dark:border-gray-200 rounded-lg p-4 text-center cursor-pointer mb-4 mt-4">
                <label htmlFor="upload-files" onClick={handleUploadClick}>
                  <Upload className="mx-auto h-12 w-12 text-black dark:text-gray-300" />
                  <p className="mt-1 text-sm text-black dark:text-gray-300">
                    Drag and drop files here or click to upload
                  </p>
                </label>
              </div>

              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li
                    key={file.id}
                    className="flex items-center space-x-2 bg-gray-100 p-2 rounded"
                  >
                    <label
                      htmlFor={`file-${file.id}`}
                      className="flex-grow truncate text-black ml-3"
                    >
                      {file.file.name}
                    </label>
                    <div className="flex space-x-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => moveFile(file.id, "up")}
                        disabled={index === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => moveFile(file.id, "down")}
                        disabled={index === files.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 py-4 border-t border-gray-900 dark:border-gray-200">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default DailyNotesForm;
