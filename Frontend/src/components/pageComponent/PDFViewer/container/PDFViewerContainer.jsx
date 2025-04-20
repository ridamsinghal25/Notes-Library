import { useState } from "react";
import { toast } from "react-toastify";
import PDFViewer from "../presentation/PDFViewer";

const PDFViewerContainer = ({ fileUrl, rotatePage, removePage }) => {
  const [numPages, setNumPages] = useState([]);

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
    />
  );
};

export default PDFViewerContainer;
