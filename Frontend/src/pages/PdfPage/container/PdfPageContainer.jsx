import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PDFPage from "../presentation/PdfPage";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/constants/route";
import { cloudinaryPdfUrl } from "@/utils/cloudinaryPdfUrl";
import NotesService from "@/services/NotesService";
import ApiError from "@/services/ApiError";
import { toast } from "react-toastify";

function PdfPageContainer() {
  const [isGenerating, setIsGenerating] = useState(false);

  const theme = useSelector((state) => state.theme?.theme);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.userDetails?.role);

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

  const handleDownload = async (url, chapterName, index) => {
    const newPdfUrl = cloudinaryPdfUrl(url, chapterName, index);

    const link = document.createElement("a");
    link.href = newPdfUrl;
    link.download = `${chapterName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateSummaryAndExtractText = async () => {
    setIsGenerating(true);

    const response = await NotesService.generateSummaryAndNotesFile(notesId);

    setIsGenerating(false);

    console.log("response", response);

    if (!(response instanceof ApiError)) {
      toast.success(
        response?.message ||
          "Notes Summary and Text file generation has started. This may take a few minutes"
      );

      navigate(
        `${ROUTES.NOTES_SUBJECT.replace(":subject", selectedNotes?.subject)}`
      );
    } else {
      toast.error(
        response?.formError ||
          response?.errorResponse?.message ||
          response?.errorMessage
      );
    }
  };

  return (
    <PDFPage
      docs={docs}
      theme={theme}
      selectedNotes={selectedNotes}
      handleDownload={handleDownload}
      userRole={userRole}
      isGenerating={isGenerating}
      generateSummaryAndExtractText={generateSummaryAndExtractText}
    />
  );
}

export default PdfPageContainer;
