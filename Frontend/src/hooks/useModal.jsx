import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return { isOpen, toggleModal };
};

export default useModal;
