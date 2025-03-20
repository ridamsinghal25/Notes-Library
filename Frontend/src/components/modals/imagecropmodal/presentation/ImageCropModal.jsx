import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropModal = ({
  toggleImageCropModal,
  imageUrl,
  imageCrop,
  setImageCrop,
  imageRef,
  previewCanvasRef,
  croppedImageUrl,
  applyCrop,
  debouncedCropChange,
}) => {
  return (
    <div
      className="fixed inset-0 z-50"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 transition-all backdrop-blur-sm"
        onClick={toggleImageCropModal}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center">
          <div className="relative w-full max-w-4xl rounded-xl bg-background border shadow-xl transition-all overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold">Crop Image</h2>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-muted transition-colors"
                onClick={toggleImageCropModal}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Original image with crop */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-medium">Original Image</h3>
                  <div className="relative bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center">
                    <ReactCrop
                      crop={imageCrop}
                      onChange={(pixelCrop, percentCrop) =>
                        debouncedCropChange(percentCrop)
                      }
                      aspect={undefined}
                    >
                      <img
                        ref={imageRef}
                        src={imageUrl || "/placeholder.svg"}
                        alt="Upload"
                        className="max-h-[400px] max-w-full object-contain"
                        crossOrigin="anonymous"
                      />
                    </ReactCrop>
                  </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-medium">Cropped Result</h3>
                  <div className="bg-muted/90 rounded-lg overflow-hidden flex items-center justify-center min-h-[200px]">
                    {croppedImageUrl ? (
                      <img
                        src={croppedImageUrl || "/placeholder.svg"}
                        alt="Cropped"
                        className="max-h-[800px] max-w-full object-contain"
                      />
                    ) : (
                      <p className="text-muted-foreground">
                        Crop the image to see the result
                      </p>
                    )}
                  </div>

                  {/* Hidden canvas for generating the cropped image */}
                  <canvas ref={previewCanvasRef} className="hidden" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={toggleImageCropModal}>
                Cancel
              </Button>
              <Button disabled={!croppedImageUrl} onClick={applyCrop}>
                Apply Crop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageCropModal;
