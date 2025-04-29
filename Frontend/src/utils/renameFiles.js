export const renameFiles = (filesArray, startIndex) => {
  if (startIndex < 0 || filesArray.length < 0) return;

  const files = filesArray.map(({ file, id }, index) => {
    const fileObject = new File([file], `Page-${startIndex + index + 1}`, {
      type: file.type,
    });

    return { id, file: fileObject };
  });

  return files;
};
