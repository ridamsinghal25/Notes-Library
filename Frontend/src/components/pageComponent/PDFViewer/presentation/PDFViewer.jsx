import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { RotateCcw, X } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
).toString();

const PDFViewer = ({
  fileUrl,
  rotatePage,
  removePage,
  onDocumentLoadSuccess,
  numPages,
}) => {
  return (
    <div className="p-5 rounded-lg shadow-sm">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Document Preview
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View, organize, and edit your PDF pages
        </p>
        <div className="flex justify-center mt-3">
          <div className="inline-flex items-center bg-violet-50 px-3 py-1 rounded-full">
            <span className="text-violet-600 text-sm font-medium mr-1">
              Total pages:
            </span>
            <span className="bg-violet-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {numPages?.length}
            </span>
          </div>
        </div>
      </div>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-18 w-18 border-t-4 border-b-4 border-violet-500"></div>
          </div>
        }
      >
        <div className="flex flex-wrap justify-center gap-6">
          {numPages?.map((pageNumber) => (
            <div
              key={pageNumber}
              className="relative group transition-all duration-200 hover:shadow-lg"
            >
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-1">
                <Button
                  title="Remove page"
                  variant="outline"
                  className="flex items-center justify-center p-2.5 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer shadow-md"
                  onClick={() => removePage(pageNumber)}
                  disabled={numPages?.length === 1}
                >
                  <X className="text-white w-4 h-4" />
                </Button>
                <Button
                  className="flex items-center justify-center p-2.5 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer shadow-md"
                  title="Rotate page"
                  onClick={() => rotatePage(pageNumber)}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute bottom-4 right-4 z-10 bg-gray-800 bg-opacity-75 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                Page {pageNumber + 1}
              </div>

              <div className="bg-gray-100 p-1 rounded-md shadow-md overflow-hidden">
                <Page
                  pageNumber={pageNumber + 1}
                  height={200}
                  width={150}
                  className="transition-all duration-300"
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            </div>
          ))}
        </div>
      </Document>
    </div>
  );
};

export default PDFViewer;
