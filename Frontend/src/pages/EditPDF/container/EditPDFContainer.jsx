import React, { useEffect, useRef, useState } from "react";
import { degrees, PDFDocument } from "pdf-lib";
import "@cyntler/react-doc-viewer/dist/index.css";
import EditPDF from "../presentation/EditPDF";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditPDFContainer = () => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [pdfDataUrl, setPdfDataUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [insertImageFiles, setInsertImageFiles] = useState([]);

  const pdfInputRef = useRef(null);
  const addImageInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (pdfDoc) {
      updatePdfPreview();
    }
  }, [pdfDoc]);

  const updatePdfPreview = async () => {
    if (!pdfDoc) return;

    setIsLoading(true);
    try {
      const base64URI = await pdfDoc.saveAsBase64({ dataUri: true });
      setPdfDataUrl(base64URI);
    } catch (error) {
      toast.error("Error generating PDF preview");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file?.size > 20 * 1024 * 1024) {
      toast.error("File size should be less than 20MB");
      return;
    }

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        if (e.target.result) {
          const pdfDoc = await PDFDocument.load(e.target.result);
          setPdfDoc(pdfDoc);

          setPages([...Array(pdfDoc.getPageCount()).keys()]);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const addUploadedImage = async (event) => {
    if (!pdfDoc) return;

    const files = Array.from(event.target.files);

    if (files.length === 0) return;

    if (files.length > 5) {
      toast.error("You can only upload up to 5 files.");
      event.target.value = ""; // Clear selected files
      return;
    }

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB");
        return;
      }

      if (file) {
        const arrayBuffer = await file.arrayBuffer();

        let image;
        if (file.type === "image/png") {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else if (file.type === "image/jpeg") {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else {
          alert("Only JPG and PNG images are supported");
          return;
        }

        const newPage = pdfDoc.addPage();
        const { width, height } = newPage.getSize();

        const imgDims = image.scale(1); // get natural image dimensions

        const imgWidth = imgDims.width;
        const imgHeight = imgDims.height;

        const scale = Math.min(width / imgWidth, height / imgHeight);

        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;

        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;

        newPage.drawImage(image, {
          x,
          y,
          width: scaledWidth,
          height: scaledHeight,
        });
      }
    }

    const newPageLengths = Array.from(
      { length: pdfDoc.getPageCount() },
      (_, index) => index
    );

    setPages(newPageLengths);

    updatePdfPreview();
  };

  const handleInsertImage = async (event) => {
    if (!pdfDoc) return;

    const files = Array.from(event.target.files);

    if (files.length === 0) return;

    if (files.length > 5) {
      toast.error("You can only upload up to 5 files.");
      event.target.value = ""; // Clear selected files
      return;
    }

    setInsertImageFiles(files);
  };

  const insertUploadedImage = async (data) => {
    const files = data?.insertImageFiles;
    const index = data?.pageIndex;

    if (index === "" || !files.length < 0) {
      toast.error("Please select a page and image");
      return Promise.reject();
    }

    if (files.length > 5) {
      toast.error("You can only upload up to 5 files.");
      return Promise.reject();
    }

    if (!pdfDoc) return;

    if (index < 1) {
      toast.error("Please select a valid page");
      return Promise.reject();
    }

    if (index > pages.length + 1) {
      toast.error("Please use Add Image button to add more pages at the end");
      return Promise.reject();
    }

    for (const [fileIndex, file] of Array.prototype.entries.call(files)) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB");
        return;
      }

      if (file) {
        const arrayBuffer = await file.arrayBuffer();

        let image;
        if (file.type === "image/png") {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else if (file.type === "image/jpeg") {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else {
          alert("Only JPG and PNG images are supported");
          return;
        }

        const newInsertedPage = pdfDoc.insertPage(fileIndex + (index - 1));
        const { width, height } = newInsertedPage.getSize();

        const imgDims = image.scale(1); // get natural image dimensions

        const imgWidth = imgDims.width;
        const imgHeight = imgDims.height;

        const scale = Math.min(width / imgWidth, height / imgHeight);

        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;

        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;

        newInsertedPage.drawImage(image, {
          x,
          y,
          width: scaledWidth,
          height: scaledHeight,
        });
      }
    }

    const newPageLengths = Array.from(
      { length: pdfDoc.getPageCount() },
      (_, index) => index
    );

    setPages(newPageLengths);

    updatePdfPreview();
  };

  const removePage = async (index) => {
    if (pdfDoc && pages.length > 1) {
      pdfDoc.removePage(index);
      setPages(pages.filter((_, i) => i !== index));
    }
  };

  const downloadPDF = async () => {
    if (pdfDoc) {
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Edited_PDF";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const rotatePage = (index) => {
    if (!pdfDoc) return;

    const page = pdfDoc.getPage(index);

    const pageRotation = page.getRotation().angle;

    page.setRotation(degrees((pageRotation + 90) % 360));
  };

  const removeSelectedInsertFile = (index) => {
    setInsertImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeAllInsertFiles = () => {
    setInsertImageFiles([]);
  };

  const triggerPdfUpload = () => {
    pdfInputRef.current?.click();
  };

  const triggerAddImageUpload = () => {
    addImageInputRef.current?.click();
  };

  const downloadSelectedPage = async (pageIndexInOriginalDoc) => {
    const newPdfDoc = await PDFDocument.create();

    const [page] = await newPdfDoc.copyPages(pdfDoc, [pageIndexInOriginalDoc]);

    newPdfDoc.addPage(page);

    if (newPdfDoc) {
      const pdfBytes = await newPdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Page-${pageIndexInOriginalDoc + 1}`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleDropPage = async (dragPageIndex, dropIndex) => {
    if (!pdfDoc) return;

    if (pdfDoc.getPages().length !== pages.length) {
      toast.error(
        "Drag and drop is only available when all pages are uploaded"
      );
      return false;
    }

    const [dropPage] = await pdfDoc.copyPages(pdfDoc, [dragPageIndex]);

    pdfDoc.removePage(dragPageIndex);
    pdfDoc.insertPage(dropIndex, dropPage);
  };

  return (
    <EditPDF
      pdfDoc={pdfDoc}
      pdfDataUrl={pdfDataUrl}
      isLoading={isLoading}
      insertImageFiles={insertImageFiles}
      pdfInputRef={pdfInputRef}
      navigate={navigate}
      addImageInputRef={addImageInputRef}
      handleFileUpload={handleFileUpload}
      addUploadedImage={addUploadedImage}
      handleInsertImage={handleInsertImage}
      insertUploadedImage={insertUploadedImage}
      removePage={removePage}
      downloadPDF={downloadPDF}
      rotatePage={rotatePage}
      removeSelectedInsertFile={removeSelectedInsertFile}
      removeAllInsertFiles={removeAllInsertFiles}
      triggerPdfUpload={triggerPdfUpload}
      triggerAddImageUpload={triggerAddImageUpload}
      downloadSelectedPage={downloadSelectedPage}
      handleDropPage={handleDropPage}
    />
  );
};

export default EditPDFContainer;
