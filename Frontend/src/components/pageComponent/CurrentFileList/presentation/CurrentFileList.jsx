import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const CurrentFilesList = ({ currentFiles, handleDeleteFile }) => {
  if (currentFiles.length === 0) return null;

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-lg font-semibold">Current Files</h3>

      {currentFiles.map((fileInfo, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 gap-2"
        >
          <div className="min-w-0 flex-1 truncate text-sm text-gray-700 dark:text-gray-300">
            {fileInfo?.name
              .replace(/^\d+-/, "")
              .replace(/^\d{3,}/, "")
              .trim() || `Page-${index + 1}`}
            <p>({(fileInfo?.size / (1024 * 1024)).toFixed(2)} MB)</p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteFile(fileInfo?.public_id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CurrentFilesList;
