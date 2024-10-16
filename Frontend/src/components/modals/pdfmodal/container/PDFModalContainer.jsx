// src/components/PDFModal/container/PDFModalContainer.jsx

import React, { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";
import PDFModal from "../presentation/PDFModal";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFModalContainer = ({ pdfUrl, chapterName }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.6);
  const [containerWidth, setContainerWidth] = useState(0);
  const showPdfModal = useSelector((state) => state.modal.modals.showPdfModal);
  const dispatch = useDispatch();

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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf"; // You can set a custom name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePageChange = (e) => {
    setPageNumber(
      Math.min(Math.max(1, parseInt(e.target.value)), numPages || 1)
    );
  };

  const togglePdfModal = () => {
    dispatch(toggleModal({ modalType: "showPdfModal" }));
  };

  return (
    <PDFModal
      pdfUrl={pdfUrl}
      showDialog={showPdfModal}
      setShowDialog={togglePdfModal}
      chapterName={chapterName}
      numPages={numPages}
      pageNumber={pageNumber}
      scale={scale}
      containerWidth={containerWidth}
      onDocumentLoadSuccess={onDocumentLoadSuccess}
      goToPrevPage={goToPrevPage}
      goToNextPage={goToNextPage}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      handleDownload={handleDownload}
      handlePageChange={handlePageChange}
    />
  );
};

export default PDFModalContainer;
