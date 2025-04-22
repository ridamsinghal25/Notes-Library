import { useState } from "react";
import { toast } from "react-toastify";
import PDFViewer from "../presentation/PDFViewer";

const PDFViewerContainer = ({
  fileUrl,
  rotatePage,
  removePage,
  downloadSelectedPage,
  handleDragStart,
  handleDragEnd,
  handleDropPage,
}) => {
  const [numPages, setNumPages] = useState([]);
  const [dragOverPage, setDragOverPage] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    if (!numPages) {
      toast.error("PDF not found");
      return;
    }

    const numPagesArray = Array.from({ length: numPages }, (_, index) => index);
    setNumPages(numPagesArray);
  };

  return (
    <PDFViewer
      fileUrl={fileUrl}
      rotatePage={rotatePage}
      removePage={removePage}
      onDocumentLoadSuccess={onDocumentLoadSuccess}
      numPages={numPages}
      dragOverPage={dragOverPage}
      setDragOverPage={setDragOverPage}
      downloadSelectedPage={downloadSelectedPage}
      handleDragStart={handleDragStart}
      handleDragEnd={handleDragEnd}
      handleDropPage={handleDropPage}
    />
  );
};

export default PDFViewerContainer;
