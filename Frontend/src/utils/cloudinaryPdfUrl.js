export function cloudinaryPdfUrl(url, fileName, index) {
  const newUrl = url?.replace(
    /\/upload/,
    `/upload/fl_attachment:${encodeURIComponent(fileName)}${index ? index : ""}`
  );

  return newUrl;
}
