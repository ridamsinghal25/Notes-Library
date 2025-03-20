import ImageCropModalContainer from "@/components/modals/imagecropmodal/container/ImageCropModalContainer";
import { Button } from "@/components/ui/button";
import { Crop, Download, Trash2 } from "lucide-react";
import React from "react";

function CreatePDF({
  imageFiles,
  removeFile,
  createAndDownloadPdf,
  toggleImageCropModal,
  editFile,
}) {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="text-2xl font-bold">Convert to PDF</h2>
          <p className="text-purple-400">
            If your image appears rotated, please click the Crop button to
            adjust it
          </p>
        </div>
        <div>
          <Button onClick={createAndDownloadPdf}>
            <Download />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {imageFiles.map((note) => (
          <div
            key={note.public_id}
            className="group relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="aspect-square relative">
              <img
                src={note.base64Url || note.url || "/placeholder.svg"}
                alt={note.name}
                className="w-full h-full object-cover"
              />

              {/* Image overlay with buttons */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      removeFile(note.public_id);
                    }}
                    className="rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => toggleImageCropModal(note)}
                    className="rounded-full"
                  >
                    <Crop className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ImageCropModalContainer editFile={editFile} />
    </div>
  );
}

export default CreatePDF;
