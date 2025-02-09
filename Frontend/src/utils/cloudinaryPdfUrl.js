export function cloudinaryPdfUrl(url, fileName, index) {
  const newUrl = url?.replace(
    /\/upload/,
    `/upload/fl_attachment:${encodeURIComponent(fileName)}${index ? index : ""}`
  );

  return newUrl;
}

export function cloudinaryFilesUrl(url, date, chapterName, index) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateMonth = months[new Date(date).getMonth()];
  const notesDate = new Date(date).getDate();

  const newUrl = url?.replace(
    /\/upload/,
    `/upload/fl_attachment:${notesDate}-${dateMonth}-${chapterName}${
      index ? index : ""
    }`
  );

  return newUrl;
}
