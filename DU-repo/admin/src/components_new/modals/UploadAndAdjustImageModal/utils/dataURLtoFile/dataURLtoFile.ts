export function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let newFilename = filename;
  if (mime === 'image') {
    mime = 'image/png';
  }
  if (newFilename === '') {
    newFilename = 'file.png';
  }
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  /* eslint-disable-next-line no-plusplus */
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], newFilename, { type: mime });
}
