export const dataURLtoFile = (dataURL: string, fileName: string) => {
  const blobBinary = atob(dataURL.split(',')[1]);

  const array = [];
  for (var i = 0; i < blobBinary.length; i++) {
    array.push(blobBinary.charCodeAt(i));
  }

  return new File([new Uint8Array(array)], fileName, { type: 'image/png' });
};
