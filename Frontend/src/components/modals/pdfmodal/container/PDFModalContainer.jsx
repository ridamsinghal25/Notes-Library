import React, { useState, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/store/ModalSlice";
import PDFModal from "../presentation/PDFModal";

const PDFModalContainer = () => {
  const [modifiedPdfUrl, setModifiedPdfUrl] = useState(null);
  const [scale, setScale] = useState(1.0);
  const selectedNotes = useSelector((state) => state.modal.selectedNotes);
  const showPdfModal = useSelector((state) => state.modal.modals.showPdfModal);
  const dispatch = useDispatch();

  useEffect(() => {
    const modifyPdf = async () => {
      const existingPdfBytes = await fetch(selectedNotes?.pdf?.url).then(
        (res) => res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const newPage = pdfDoc.insertPage(0, [600, 600]);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      newPage.drawText(`Chapter: ${selectedNotes?.chapterName}`, {
        x: 100,
        y: 300,
        size: 40,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const urlBlob = URL.createObjectURL(blob);

      // Set the modified PDF URL to the component's state
      setModifiedPdfUrl(urlBlob);
    };

    if (showPdfModal) {
      modifyPdf();
    }
  }, [selectedNotes, showPdfModal]);

  const togglePdfModal = () => {
    dispatch(toggleModal({ modalType: "showPdfModal" }));
  };

  return (
    <PDFModal
      modifiedPdfUrl={modifiedPdfUrl}
      showDialog={showPdfModal}
      setShowDialog={togglePdfModal}
      chapterName={selectedNotes?.chapterName}
      scale={scale}
    />
  );
};

export default PDFModalContainer;
