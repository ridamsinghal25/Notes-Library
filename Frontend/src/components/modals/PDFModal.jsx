import { CircleX } from "lucide-react";
import React from "react";

function PDFModal({ pdfUrl, togglePDFView, chapterName }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gray-200 flex items-center justify-between px-4">
          <h3 className="text-lg font-semibold text-gray-800">{chapterName}</h3>
          <button
            onClick={togglePDFView}
            className="text-gray-600 hover:text-gray-800 transition duration-300"
          >
            <CircleX className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-12 left-0 right-0 bottom-0">
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            title="PDF Viewer"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default PDFModal;
