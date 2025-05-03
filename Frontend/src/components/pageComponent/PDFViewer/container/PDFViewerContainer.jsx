import { useState } from "react";
import { toast } from "react-toastify";
import PDFViewer from "../presentation/PDFViewer";

const PDFViewerContainer = ({
  fileUrl,
  rotatePage,
  removePage,
  downloadSelectedPage,
  handleDropPage,
}) => {
  const [pages, setPages] = useState([]);
  const [dragOverPage, setDragOverPage] = useState(null);
  const [dragPageIndex, setDragPageIndex] = useState("");

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

  const removePageInReactPDF = (pageIndex) => {
    const updatedPages = pages.filter((_, index) => index !== pageIndex);
    setPages(updatedPages);

    removePage(pageIndex);
  };

  const handleDragStart = (e, index) => {
    e.target.style.opacity = "0.5";
    setDragPageIndex(index);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDragPageIndex("");
  };

  const handleDropPageInReactPDF = async (dropIndex) => {
    if (dragPageIndex === dropIndex) {
      return;
    }

    const isDropAllowed = await handleDropPage(dragPageIndex, dropIndex);

    if (!isDropAllowed) {
      return;
    }

    const updatedPages = [...pages];
    const [dropPage] = updatedPages.splice(dragPageIndex, 1);

    updatedPages.splice(dropIndex, 0, dropPage);

    setPages(updatedPages);
  };

  return (
    <PDFViewer
      fileUrl={fileUrl}
      rotatePageInReactPDF={rotatePageInReactPDF}
      removePageInReactPDF={removePageInReactPDF}
      onDocumentLoadSuccess={onDocumentLoadSuccess}
      pages={pages}
      dragOverPage={dragOverPage}
      setDragOverPage={setDragOverPage}
      handleDragStart={handleDragStart}
      handleDragEnd={handleDragEnd}
      handleDropPageInReactPDF={handleDropPageInReactPDF}
      downloadSelectedPage={downloadSelectedPage}
    />
  );
};

export default PDFViewerContainer;
