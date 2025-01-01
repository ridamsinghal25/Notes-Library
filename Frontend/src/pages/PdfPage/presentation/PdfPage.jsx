import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

function PDFPage({ docs, theme }) {
  return (
    <div className="mt-5">
      <HelmetProvider>
        <Helmet>
          <title>Pdf Notes</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a pdf page" />
        </Helmet>
      </HelmetProvider>
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        theme={{
          primary: "#5296d8",
          secondary: "#ffffff",
          tertiary: "#5296d899",
          textPrimary: "#ffffff",
          textSecondary: "#5296d8",
          textTertiary: "#00000099",
          disableThemeScrollbar: false,
        }}
        config={{
          pdfZoom: {
            defaultZoom: 0.8,
          },
          pdfVerticalScrollByDefault: true,
        }}
        style={{
          backgroundColor: `${theme === "dark" ? "#28282B" : "#FAF9F6"}`,
        }}
      />
    </div>
  );
}

export default PDFPage;

// function PDFPage({ viewer }) {
//   return (
//     <div className="pt-14 pb-6 max-w-screen sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl h-screen">
//       <HelmetProvider>
//         <Helmet>
//           <title>Pdf Notes</title>
//           <meta charset="UTF-8" />
//           <meta name="description" content="This is a pdf page" />
//         </Helmet>
//       </HelmetProvider>
//       <div className="h-full w-full" ref={viewer}></div>
//     </div>
//   );
// }

// export default PDFPage;
