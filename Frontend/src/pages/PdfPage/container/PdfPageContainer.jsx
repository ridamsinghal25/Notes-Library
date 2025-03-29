import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import PDFPage from "../presentation/PdfPage";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { cloudinaryPdfUrl } from "@/utils/cloudinaryPdfUrl";

function PdfPageContainer() {
  const theme = useSelector((state) => state.theme?.theme);
  const navigate = useNavigate();

  const [searchParmas] = useSearchParams();
  const notesId = searchParmas.get("notesId");

  const userNotes = useSelector((state) =>
    state.notes.userNotes?.find((chap) =>
      chap.notes.some((note) => note._id === notesId)
    )
  );

  useEffect(() => {
    if (!notesId || !userNotes) {
      navigate(ROUTES.NOTES);
    }
  }, [notesId, userNotes]);

  const selectedNotes = useMemo(() => {
    if (!userNotes) return null;

    return {
      ...userNotes,
      notes: userNotes?.notes?.filter((note) => note._id === notesId),
    };
  }, [userNotes, notesId]);

  const pdfUrl = cloudinaryPdfUrl(
    selectedNotes?.notes[0].pdf?.url,
    selectedNotes?.chapterName
  );

  useEffect(() => {
    if (!pdfUrl) {
      navigate(ROUTES.NOTES);
    }
  }, [pdfUrl]);

  const docs = [
    {
      uri: pdfUrl,
      fileName: selectedNotes?.chapterName,
    },
  ];

  return <PDFPage docs={docs} theme={theme} />;
}

export default PdfPageContainer;

// import React, { useEffect, useRef } from "react";
// import WebViewer from "@pdftron/pdfjs-express-viewer";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "@/constants/route";
// import PDFPage from "../presentation/PdfPage";

// function PdfPageContainer() {
//   const viewer = useRef(null);
//   const instance = useRef(null);
//   const selectedNotes = useSelector((state) => state.modal.selectedNotes);
//   const navigate = useNavigate();
//   const pdfUrl = selectedNotes?.pdf?.url;

//   useEffect(() => {
//     if (!pdfUrl) {
//       navigate(ROUTES.NOTES);
//     }
//   }, [pdfUrl]);

//   useEffect(() => {
//     if (!pdfUrl) return;

//     // Initialize WebViewer only once
//     WebViewer(
//       {
//         path: "../../../../../webviewer", // place webviewer in react public directory(for production) and root frontend directory(for localhost)
//         initialDoc: pdfUrl,
//         licenseKey: "dGiXN50WjhorEDQUkX93",
//       },
//       viewer.current
//     ).then((inst) => {
//       instance.current = inst;

//       // Set WebViewer to dark mode
//       inst.UI.setTheme("dark");

//       // Set the hand tool as the default tool
//       inst.setToolMode("Pan");

//       // Lazy load pages on demand
//       inst.loadDocument(pdfUrl, { onLoad: "on-demand" });

//       // Disable annotation functionality initially
//       inst.annotManager.disableAnnotations();

//       // Disable annotation-related UI elements
//       inst.UI.disableElements([
//         "annotationPopup",
//         "contextMenuPopup",
//         "toolsButton",
//         "textPopup",
//         "searchButton",
//         "selectToolButton",
//         "viewControlsButton",
//       ]);

//       inst.UI.setLayoutMode(inst.UI.LayoutMode.Single);

//       // Remove annotation tools from the header toolbar
//       inst.UI.setHeaderItems((header) => {
//         header.delete("freeHandToolGroupButton");
//         header.delete("stickyToolGroupButton");
//         header.delete("shapeToolGroupButton");
//       });
//     });
//   }, [pdfUrl]);

//   return <PDFPage viewer={viewer} />;
// }

// export default PdfPageContainer;
