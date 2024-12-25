import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

function PDFPage({ viewer }) {
  return (
    <div className="pt-14 pb-6 max-w-screen sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl h-screen">
      <HelmetProvider>
        <Helmet>
          <title>Pdf Notes</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a pdf page" />
        </Helmet>
      </HelmetProvider>
      <div className="h-full w-full" ref={viewer}></div>
    </div>
  );
}

export default PDFPage;
