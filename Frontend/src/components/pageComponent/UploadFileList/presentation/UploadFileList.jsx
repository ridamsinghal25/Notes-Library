import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import React from "react";

function UploadFileList({ formFiles = [], moveFile, removeFile }) {
  if (formFiles.length === 0) {
    return null;
  }

  return (
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
            <div>
              <img
                src={file.file && URL.createObjectURL(file?.file)}
                alt="📂File"
                className="h-12 w-12 object-cover rounded-md"
              />
            </div>
            <div className="min-w-0 flex-1 truncate text-sm text-gray-700 dark:text-gray-300">
              {file.file.name}
              <p>({(file.file.size / (1024 * 1024)).toFixed(2)} MB)</p>
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
  );
}

export default UploadFileList;
