import { allowedTypes } from '../../uploadAndAdjustImageModal.types';
import { getBase64 } from '../getBase64';
import { hasMinPicDimensions } from '../hasMinPicDimensions';

const isImage = (file: File) => file && allowedTypes.includes(file.type);

export const verifyFile = async (
  file: File,
  minImageSize: number
): Promise<{ mimeType: string; base64: string; file: File }> => {
  try {
    const base64Image = await getBase64(file);

    if (!isImage(file)) {
      throw new Error('File is not of a supported image type');
    }

    if (typeof base64Image !== 'string') {
      throw new Error('Image failed to upload');
    }

    const fileData = {
      mimeType: file.type, // file is not null/undefined if `isImage` passed
      base64: base64Image,
      file
    };

    await hasMinPicDimensions(fileData, minImageSize);
    return fileData;
  } catch (error) {
    throw new Error(error.message);
  }
};
