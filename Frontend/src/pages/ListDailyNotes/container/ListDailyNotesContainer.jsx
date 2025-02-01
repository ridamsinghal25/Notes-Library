import React, { useEffect, useState } from "react";
import ListDailyNotes from "../presentation/ListDailyNotes";
const sampleNotes = [
  {
    id: 1,
    src: [
      "https://res.cloudinary.com/manusinghal119/image/upload/v1737885601/Compiler_Design_OOP_1737885599175.jpg",
      "https://res.cloudinary.com/manusinghal119/image/upload/v1736685563/Software_Engineering_New_1736685561093.jpg",
      "https://res.cloudinary.com/manusinghal119/image/upload/v1737885601/Compiler_Design_OOP_1737885599175.jpg",
      "https://res.cloudinary.com/manusinghal119/image/upload/v1737885601/Compiler_Design_OOP_1737885599175.jpg",
    ],
    date: "2023-01-15",
    alt: "Note 1",
  },
  {
    id: 2,
    src: [
      "https://res.cloudinary.com/manusinghal119/image/upload/v1737885601/Compiler_Design_OOP_1737885599175.jpg",
      "https://res.cloudinary.com/manusinghal119/image/upload/v1737885601/Compiler_Design_OOP_1737885599175.jpg",
      "https://res.cloudinary.com/manusinghal119/image/upload/v1737885601/Compiler_Design_OOP_1737885599175.jpg",
      "https://res.cloudinary.com/manusinghal119/image/upload/v1737885601/Compiler_Design_OOP_1737885599175.jpg",
    ],
    date: "2023-01-16",
    alt: "Note 2",
  },
  {
    id: 3,
    src: [
      "https://res.cloudinary.com/manusinghal119/image/upload/v1737885601/Compiler_Design_OOP_1737885599175.jpg",
      "https://res.cloudinary.com/manusinghal119/image/upload/v1737885601/Compiler_Design_OOP_1737885599175.jpg",
    ],
    date: "2023-01-17",
    alt: "Note 3",
  },
  {
    id: 4,
    src: [
      "https://res.cloudinary.com/manusinghal119/image/upload/v1737885601/Compiler_Design_OOP_1737885599175.jpg",
      "https://res.cloudinary.com/manusinghal119/image/upload/v1737885601/Compiler_Design_OOP_1737885599175.jpg",
    ],
    date: "2023-01-18",
    alt: "Note 4",
  },
];

function ListDailyNotesContainer() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNote, setSelectedNote] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const subject = {
    subject: "OOP",
    chapterNumber: 1,
    chapterName: "Chapter 1",
  };

  useEffect(() => {
    if (selectedNote) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedNote]);

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoomLevel(1);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : selectedNote?.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < selectedNote?.length - 1 ? prev + 1 : 0
    );
  };
  return (
    <ListDailyNotes
      zoomLevel={zoomLevel}
      selectedNote={selectedNote}
      setSelectedNote={setSelectedNote}
      currentImageIndex={currentImageIndex}
      setCurrentImageIndex={setCurrentImageIndex}
      subject={subject}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      resetZoom={resetZoom}
      handlePrevImage={handlePrevImage}
      handleNextImage={handleNextImage}
      sampleNotes={sampleNotes}
    />
  );
}

export default ListDailyNotesContainer;
