import { TYPED_STRINGS } from "@/constants/constants";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useSelector } from "react-redux";
import HomePage from "@/pages/Home/presentation/HomePage";

function HomePageContainer() {
  const typeElement = useRef(null);
  const theme = useSelector((state) => state.theme?.theme);

  useEffect(() => {
    const typed = new Typed(typeElement.current, {
      strings: TYPED_STRINGS,
      backDelay: 400,
      typeSpeed: 150,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <HomePage typeElement={typeElement} theme={theme} />;
}

export default HomePageContainer;
