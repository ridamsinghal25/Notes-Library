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

    // Either do this
    const pagesArray = Array.from(
      { length: pagesData.numPages },
      async (_, index) => {
        const page = await pagesData.getPage(index + 1);
        return {
          pageNumber: index,
          rotate: page.rotate,
        };
      }
    );

    const pageData = await Promise.all(pagesArray);

    // or this
    // const pagePromises = Array.from(
    //   { length: pagesData.numPages },
    //   (_, index) =>
    //     pagesData.getPage(index + 1).then((page) => ({
    //       pageNumber: index + 1,
    //       rotate: page.rotate,
    //     }))
    // );

    setPages(pageData);
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
