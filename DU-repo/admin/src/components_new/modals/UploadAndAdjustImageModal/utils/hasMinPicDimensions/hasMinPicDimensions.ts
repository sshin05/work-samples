interface FileData {
  mimeType: string;
  base64: string;
  [key: string]: unknown;
}

export const hasMinPicDimensions = (
  { mimeType, base64 }: FileData,
  minImageSize: number
): Promise<boolean | Error> =>
  new Promise((resolve, reject) => {
    if (!/^image\//.test(mimeType)) {
      reject(new Error('File is not of a supported image type'));
    }

    const image = new Image(200, 200);
    image.src = `data:${mimeType};base64,${base64}`;

    image.decode().then(() => {
      if (!image?.width || !image?.height) {
        reject(new Error('Image has no dimensions'));
      }

      if (image.width < minImageSize || image.height < minImageSize) {
        reject(new Error('Image is too small'));
      }
      resolve(true);
    });
  });
