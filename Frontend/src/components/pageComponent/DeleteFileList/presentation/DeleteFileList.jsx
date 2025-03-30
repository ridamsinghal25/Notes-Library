import { Button } from "@/components/ui/button";
import { Loader2, Undo2 } from "lucide-react";

const DeletedFilesList = ({
  deletedFiles,
  handleRestoreFile,
  handlePermanentDelete,
  isSubmitting,
}) => {
  if (deletedFiles.length === 0) return null;

  return (
    <div className="space-y-4 mt-8">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">Deleted Files</h3>
        <Button
          variant="destructive"
          size="sm"
          onClick={handlePermanentDelete}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </>
          ) : (
            "Delete Files"
          )}
        </Button>
      </div>

      {deletedFiles.map((fileInfo, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-red-100 dark:bg-red-900 rounded-md"
        >
          <div className="min-w-0 flex-1 truncate text-sm text-gray-700 dark:text-gray-300">
            {fileInfo?.name}
            <p>({(fileInfo?.size / (1024 * 1024)).toFixed(2)} MB)</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRestoreFile(fileInfo?.public_id)}
          >
            <Undo2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DeletedFilesList;
