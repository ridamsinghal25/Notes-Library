// src/components/PDFModal/presentation/PDFModalPresentation.jsx

import React from "react";
import { Document, Page } from "react-pdf";
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

const PDFModal = ({
  pdfUrl,
  showDialog,
  setShowDialog,
  chapterName,
  numPages,
  pageNumber,
  scale,
  containerWidth,
  onDocumentLoadSuccess,
  goToPrevPage,
  goToNextPage,
  zoomIn,
  zoomOut,
  handleDownload,
  handlePageChange,
}) => {
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
          <DialogTitle className="text-2xl font-bold text-primary flex justify-between items-center dark:text-violet-500">
            {chapterName}
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4 dark:text-white" />
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
                onChange={handlePageChange}
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
};

export default PDFModal;
