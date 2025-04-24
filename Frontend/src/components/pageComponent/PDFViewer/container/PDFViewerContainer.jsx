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
  const [pages, setPages] = useState([]);
  const [dragOverPage, setDragOverPage] = useState(null);

  const onDocumentLoadSuccess = async (pagesData) => {
    if (!pagesData.numPages) {
      toast.error("PDF not found");
      return;
    }

    const pagesArray = Array.from(
      { length: pagesData.numPages },
      (_, index) => ({
        pageNumber: index,
        rotate: 0,
      })
    );

    setPages(pagesArray);
  };

  const rotatePageInReactPDF = (pageIndex) => {
    const updatedPages = pages.map((page) => {
      if (page.pageNumber === pageIndex) {
        page.rotate = (page.rotate + 90) % 360;
        return page;
      }
      return page;
    });

    setPages(updatedPages);
    rotatePage(pageIndex);
  };

  return (
    <PDFViewer
      fileUrl={fileUrl}
      rotatePageInReactPDF={rotatePageInReactPDF}
      removePage={removePage}
      onDocumentLoadSuccess={onDocumentLoadSuccess}
      pages={pages}
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
