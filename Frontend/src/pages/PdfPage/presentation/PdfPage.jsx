import React from "react";

function PDFPage({ viewer }) {
  return (
    <div className="pt-14 pb-6 max-w-screen sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl h-screen">
      <div className="h-full w-full" ref={viewer}></div>
    </div>
  );
}

export default PDFPage;
