import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, Trash2, Undo2, Upload } from "lucide-react";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { useCallback, useRef } from "react";
import UploadFileList from "../../UploadFileList/presentation/UploadFileList";
import CurrentFilesList from "../../CurrentFileList/presentation/CurrentFileList";
import DeletedFilesList from "../../DeleteFileList/presentation/DeleteFileList";

function UpdateFiles({
  isSubmitting,
  onDailyNotesFileUpdate,
  currentFiles,
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
            onSubmit={updateFilesForm.handleSubmit((data, event) =>
              onDailyNotesFileUpdate(data).then(() => {
                event.target.reset();
                updateFilesForm.reset();
              })
            )}
            className="space-y-10 mt-10"
          >
            <div className="p-4 sm:p-6">
              <FormFieldInput
                form={updateFilesForm}
                id="upload-files"
                name="files"
                type="file"
                accept=" image/jpg, image/jpeg"
                multiple
                onChange={(event) => handleFileChange(event, formFiles)}
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
                formFiles={formFiles}
                moveFile={moveFile}
                removeFile={removeFile}
              />
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

        <CurrentFilesList
          currentFiles={currentFiles}
          handleDeleteFile={handleDeleteFile}
        />

        <DeletedFilesList
          deletedFiles={deletedfiles}
          handleRestoreFile={handleRestoreFile}
          handlePermanentDelete={handlePermanentDelete}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

export default UpdateFiles;
