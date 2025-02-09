import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Trash2,
  Undo2,
  Upload,
  X,
} from "lucide-react";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { useCallback, useRef } from "react";

function UpdateFiles({
  isSubmitting,
  onDailyNotesFileUpdate,
  files,
  deletedfiles,
  handleDeleteFile,
  handleRestoreFile,
  handlePermanentDelete,
  formFiles,
  handleFileChange,
  removeFile,
  moveFile,
  updateFilesForm,
}) {
  const fileInputRef = useRef(null);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="h-full">
      <div className="space-y-6">
        <Form {...updateFilesForm}>
          <form
            onSubmit={updateFilesForm.handleSubmit(onDailyNotesFileUpdate)}
            className="space-y-10 mt-10"
          >
            <div className="p-4 sm:p-6">
              <FormFieldInput
                form={updateFilesForm}
                id="upload-files"
                name="files"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
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

              {formFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Uploaded Files ({formFiles.length})
                  </h3>
                  <ul className="">
                    {formFiles.map((file, index) => (
                      <li
                        key={file.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-200 rounded-md dark:hover:bg-gray-700 gap-2"
                      >
                        <div className="min-w-0 flex-1 truncate text-sm text-gray-700 dark:text-gray-300">
                          {file.file.name}
                          <p>
                            ({(file.file.size / (1024 * 1024)).toFixed(2)} MB)
                          </p>
                        </div>
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
                            disabled={index === formFiles.length - 1}
                            className="h-8 w-8"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(file.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/70"
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
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  "Update Files"
                )}
              </Button>
            </div>
          </form>
        </Form>

        {files.length > 0 && (
          <div className="space-y-4 mt-8">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">Current Files</h3>
            </div>

            {files.map((fileInfo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 gap-2"
              >
                <div className="min-w-0 flex-1 truncate text-sm text-gray-700 dark:text-gray-300">
                  {fileInfo?.name}
                  <p>({(fileInfo?.size / (1024 * 1024)).toFixed(2)} MB)</p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteFile(fileInfo?.public_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {deletedfiles.length > 0 && (
          <div className="space-y-4 mt-8">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">Deleted Files</h3>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handlePermanentDelete()}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  "Delete Files"
                )}
              </Button>
            </div>

            {deletedfiles.map((fileInfo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-red-100 dark:bg-red-900 rounded-md"
              >
                <div className="min-w-0 flex-1 truncate text-sm text-gray-700 dark:text-gray-300">
                  {fileInfo?.name}
                  <p>({(fileInfo?.size / (1024 * 1024)).toFixed(2)} MB)</p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestoreFile(fileInfo?.public_id)}
                  >
                    <Undo2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateFiles;
