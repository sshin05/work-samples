export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      const stringResult = reader.result as string;
      const readerComma = stringResult?.indexOf(',') || -1;
      return resolve(stringResult?.slice(readerComma + 1));
    });
    reader.addEventListener('error', () =>
      reject(new Error('File could not be parsed'))
    );
  });
