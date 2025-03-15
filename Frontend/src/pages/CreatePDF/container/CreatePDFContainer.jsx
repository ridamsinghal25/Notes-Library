import React, { useEffect, useState } from "react";
import CreatePDF from "../presentation/CreatePDF";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PDFDocument } from "pdf-lib";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import { setSelectedImageFile, toggleModal } from "@/store/ModalSlice";

function CreatePDFContainer() {
  const [imageFiles, setImageFiles] = useState([]);
  const dailyNotes = useSelector((state) => state.dailyNotes.notes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (dailyNotes.length === 0) {
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    const sortedDailyNotes = [...dailyNotes]
      ?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      ?.map((note) => note.notes)
      ?.reduce((acc, curr) => [...acc, ...curr], []);

    setImageFiles(sortedDailyNotes);
  }, [dailyNotes]);

  const removeFile = async (publicId) => {
    setImageFiles(imageFiles.filter(({ public_id }) => publicId !== public_id));
  };

  const createAndDownloadPdf = async () => {
    const pdfDocs = await PDFDocument.create();

    const imgBuffers = await Promise.all(
      imageFiles.map(({ url, base64Url }) => {
        if (!url) return base64Url;

        return axios
          .get(url, {
            withCredentials: false,
            responseType: "arraybuffer",
          })
          .then((response) => response.data);
      })
    );

    if (imgBuffers.length > 0) {
      for (let i = 0; i < imgBuffers.length; i++) {
        const newPage = pdfDocs.addPage();

        const { width, height } = newPage.getSize();

        const image = await pdfDocs.embedJpg(imgBuffers[i]);

        newPage.drawImage(image, {
          x: 0,
          y: 0,
          height,
          width,
        });
      }
    }

    const pdfBytes = await pdfDocs.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = dailyNotes[0].chapterName;
    link.click();
  };

  const toggleImageCropModal = (file) => {
    dispatch(toggleModal({ modalType: "imageCropModal" }));
    dispatch(setSelectedImageFile(file));
  };

  const editFile = (publicId, croppedImageUrl) => {
    setImageFiles((prev) =>
      prev.map((file) =>
        file.public_id === publicId
          ? { ...file, url: "", base64Url: croppedImageUrl }
          : file
      )
    );
  };

  return (
    <div>
      <div className="container mx-auto pt-8 px-4">
        <Button
          className="flex gap-2"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          <CircleArrowLeft />
          <p>Navigate back</p>
        </Button>
      </div>
      <CreatePDF
        imageFiles={imageFiles}
        removeFile={removeFile}
        createAndDownloadPdf={createAndDownloadPdf}
        toggleImageCropModal={toggleImageCropModal}
        editFile={editFile}
      />
    </div>
  );
}

export default CreatePDFContainer;
