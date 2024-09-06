export function getPreviewImageUrl(pdfUrl) {
  const transformation = "upload/c_thumb,w_400,h_600,pg_1/";

  const splitPdfUrl = pdfUrl?.split("upload/");

  const previewImageUrl = splitPdfUrl
    ?.join(transformation)
    ?.replace(".pdf", ".jpg");

  return previewImageUrl;
}
