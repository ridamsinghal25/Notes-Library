import React, { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/pdfjs-express-viewer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import PDFPage from "../presentation/PdfPage";

function PdfPageContainer() {
  const viewer = useRef(null);
  const instance = useRef(null);
  const selectedNotes = useSelector((state) => state.modal.selectedNotes);
  const navigate = useNavigate();
  const pdfUrl = selectedNotes?.pdf?.url;

  useEffect(() => {
    if (!pdfUrl) {
      navigate(ROUTES.NOTES);
    }
  }, [pdfUrl]);

  useEffect(() => {
    if (!pdfUrl) return;

    // Initialize WebViewer only once
    WebViewer(
      {
        path: "../../../../../webviewer",
        initialDoc: pdfUrl,
        licenseKey: "dGiXN50WjhorEDQUkX93",
      },
      viewer.current
    ).then((inst) => {
      instance.current = inst;

      // Set WebViewer to dark mode
      inst.UI.setTheme("dark");

      // Set the hand tool as the default tool
      inst.setToolMode("Pan");

      // Lazy load pages on demand
      inst.loadDocument(pdfUrl, { onLoad: "on-demand" });

      // Disable annotation functionality initially
      inst.annotManager.disableAnnotations();

      // Disable annotation-related UI elements
      inst.UI.disableElements([
        "annotationPopup",
        "contextMenuPopup",
        "toolsButton",
        "textPopup",
        "searchButton",
        "selectToolButton",
        "leftPanel",
        "leftPanelButton",
      ]);

      // Remove annotation tools from the header toolbar
      inst.UI.setHeaderItems((header) => {
        header.delete("freeHandToolGroupButton");
        header.delete("stickyToolGroupButton");
        header.delete("shapeToolGroupButton");
      });
    });
  }, [pdfUrl]);

  return <PDFPage viewer={viewer} />;
}

export default PdfPageContainer;
