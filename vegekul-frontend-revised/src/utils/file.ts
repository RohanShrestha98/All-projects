// Utils for file operations

export const createDownloadableFile = (
  blob: { data: Blob | MediaSource },
  filename: string
) => {
  const url = window.URL.createObjectURL(blob.data);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const removeAllEmptyValues = (obj: any) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    if (newObj[key] && typeof newObj[key] === 'object') {
      removeAllEmptyValues
        ? (newObj[key] = removeAllEmptyValues(newObj[key]))
        : newObj[key];
    } else if (
      newObj[key] === undefined ||
      newObj[key] === null ||
      newObj[key] === ''
    ) {
      delete newObj[key];
    }
  });
  return newObj;
};
