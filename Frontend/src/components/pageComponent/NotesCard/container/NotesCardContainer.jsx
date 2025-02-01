import { useState } from "react";
import NotesCard from "../presentation/NotesCard";

function NotesCardContainer({ subject }) {
  const [isOpen, setIsOpen] = useState(false);
  return <NotesCard subject={subject} isOpen={isOpen} setIsOpen={setIsOpen} />;
}

export default NotesCardContainer;
