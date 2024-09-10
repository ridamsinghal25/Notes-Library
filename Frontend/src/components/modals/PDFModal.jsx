import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfModal({
  pdfUrl,
  showDialog,
  setShowDialog,
  chapterName,
}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf"; // You can set a custom name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const updateWidth = () => {
      const container = document.getElementById("pdf-container");
      if (container) {
        setContainerWidth(container.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent
        className={cn(
          "max-w-[95vw] w-full max-h-[95vh] h-full p-0 overflow-hidden",
          "bg-background/80 backdrop-blur-sm",
          "shadow-lg rounded-lg border border-border",
          "transition-all duration-300 ease-in-out",
          showDialog ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
        hideClose
      >
        <DialogHeader className="p-4 bg-background/90 backdrop-blur-sm border-b border-border">
          <DialogTitle className="text-2xl font-bold text-primary flex justify-between items-center">
            {chapterName}
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex flex-wrap justify-center gap-2 p-4 bg-background/90 backdrop-blur-sm border-b border-border">
            <Button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Prev
            </Button>
            <Button
              onClick={goToNextPage}
              disabled={pageNumber >= (numPages || 1)}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={zoomIn}>
              <ZoomIn className="mr-2 h-4 w-4" /> Zoom In
            </Button>
            <Button onClick={zoomOut}>
              <ZoomOut className="mr-2 h-4 w-4" /> Zoom Out
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <div className="flex items-center gap-2">
              <Label htmlFor="page-input">Page:</Label>
              <Input
                id="page-input"
                type="number"
                min={1}
                max={numPages || 1}
                value={pageNumber}
                onChange={(e) =>
                  setPageNumber(
                    Math.min(
                      Math.max(1, parseInt(e.target.value)),
                      numPages || 1
                    )
                  )
                }
                className="w-16 text-center"
              />
              <span>of {numPages}</span>
            </div>
          </div>
          <div
            id="pdf-container"
            className="flex-grow overflow-auto p-4 bg-background/50 backdrop-blur-sm"
          >
            <div className="max-w-5xl mx-auto flex justify-center">
              <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  width={
                    containerWidth
                      ? Math.min(containerWidth - 32, 800)
                      : undefined
                  }
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="mx-auto lg:mx-0"
                />
              </Document>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
