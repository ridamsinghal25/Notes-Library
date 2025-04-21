import React, { useEffect, useRef, useState } from "react";
import { degrees, PDFDocument, rgb } from "pdf-lib";
import "@cyntler/react-doc-viewer/dist/index.css";
import EditPDF from "../presentation/EditPDF";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDebounce } from "@/hooks/useDebounce";

const EditPDFContainer = () => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [pdfDataUrl, setPdfDataUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [insertImageFile, setInsertImageFile] = useState(null);

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

  const debouncedUpdatePdfPreview = useDebounce(updatePdfPreview, 500);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file.size > 20 * 1024 * 1024) {
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

    const file = event.target.files[0];

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

      setPages([...pages, pages.length]);
      debouncedUpdatePdfPreview();
    }
  };

  const handleInsertImage = async (event) => {
    const file = event.target?.files[0];

    if (file?.size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 10MB");
      return;
    }

    if (file) {
      setInsertImageFile(file);
    }
  };

  const insertUploadedImage = async (data) => {
    const file = data?.insertImageFile?.[0];
    const index = data?.pageIndex;

    if (index === "" || !file) {
      toast.error("Please select a page and image");
      return;
    }

    if (index > pages.length || index < 1) {
      toast.error("Please select a valid page");
      return;
    }

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

    const newInsertedPage = pdfDoc.insertPage(index - 1);
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

    setPages([...pages, pages.length]);
    debouncedUpdatePdfPreview();
  };

  const removePage = async (index) => {
    if (pdfDoc && pages.length > 1) {
      pdfDoc.removePage(index);
      setPages(pages.filter((_, i) => i !== index));
      updatePdfPreview();
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

    debouncedUpdatePdfPreview();
  };

  const removeSelectedInsertFile = () => {
    setInsertImageFile(null);
  };

  const triggerPdfUpload = () => {
    pdfInputRef.current?.click();
  };

  const triggerAddImageUpload = () => {
    addImageInputRef.current?.click();
  };

  return (
    <EditPDF
      pdfDoc={pdfDoc}
      pdfDataUrl={pdfDataUrl}
      isLoading={isLoading}
      insertImageFile={insertImageFile}
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
      triggerPdfUpload={triggerPdfUpload}
      triggerAddImageUpload={triggerAddImageUpload}
    />
  );
};

export default EditPDFContainer;
