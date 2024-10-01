import { TYPED_STRINGS } from "@/constants/constants";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useSelector } from "react-redux";
import Home from "@/pages/Home/presentation/Home";

function HomeContainer() {
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

  return <Home typeElement={typeElement} theme={theme} />;
}

export default HomeContainer;
