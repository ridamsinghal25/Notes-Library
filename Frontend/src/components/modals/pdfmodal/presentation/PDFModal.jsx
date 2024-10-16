import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

const PDFModal = ({
  showDialog,
  setShowDialog,
  chapterName,
  modifiedPdfUrl,
  scale,
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent
        className="max-w-[95vw] w-full h-full p-0 overflow-hidden bg-background/80 backdrop-blur-sm shadow-lg rounded-lg border border-border"
        hideClose
      >
        <DialogTitle className="sr-only">{chapterName}</DialogTitle>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 bg-background/90 backdrop-blur-sm border-b border-border">
            <h2 className="text-lg font-semibold text-primary">
              {chapterName}
            </h2>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <CircleX className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
          <div className="flex flex-col h-full overflow-hidden">
            <div
              id="pdf-container"
              className="flex-grow overflow-auto p-4 bg-background/50 backdrop-blur-sm"
            >
              <div className="w-full h-full mx-auto flex justify-center">
                {modifiedPdfUrl ? (
                  <iframe
                    src={modifiedPdfUrl}
                    title="PDF Viewer"
                    width="100%"
                    height="100%"
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: "top left",
                    }}
                  />
                ) : (
                  <p>Loading PDF...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFModal;
