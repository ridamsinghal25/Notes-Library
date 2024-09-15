import React from "react";
import { useSelector } from "react-redux";

function Container({ children }) {
  const theme = useSelector((state) => state.theme?.theme);

  return (
    <div
      className={`min-h-screen w-full ${
        theme === "dark"
          ? "[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
          : "[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"
      }`}
    >
      {children}
    </div>
  );
}

export default Container;
