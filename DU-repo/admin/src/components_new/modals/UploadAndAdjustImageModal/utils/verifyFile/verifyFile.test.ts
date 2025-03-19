import { verifyFile } from './verifyFile';

describe('verifyFile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Throws an error when given an invalid file
  it('should throw an error when given an invalid file', async () => {
    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const minImageSize = 150;

    await expect(verifyFile(invalidFile, minImageSize)).rejects.toThrowError(
      'File is not of a supported image type'
    );
  });

  // Returns a Promise that resolves with an object containing mimeType, base64 and file properties when given a valid file
  it('should resolve with an object containing mimeType, base64, and file properties when given a valid file', async () => {
    HTMLCanvasElement.prototype.toBlob = jest.fn();
    const minImageSize = 150;
    const canvas = document.createElement('canvas');
    canvas.width = minImageSize;
    canvas.height = minImageSize;
    canvas.toBlob(async blob => {
      const file = new File([blob], 'test.png', {
        type: 'image/png'
      });

      expect(verifyFile(file, minImageSize)).toReturnWith({
        mimeType: 'image/png',
        base64: '',
        file
      });
    });
  });

  // Throws an error when given a file with an unsupported image type
  it('should throw an error when given a file with an unsupported image type', async () => {
    HTMLCanvasElement.prototype.toBlob = jest.fn();
    const minImageSize = 150;
    const canvas = document.createElement('canvas');
    canvas.width = minImageSize;
    canvas.height = minImageSize;
    canvas.toBlob(async blob => {
      const file = new File([blob], 'test.photo', {
        type: 'image/photo'
      });

      await expect(verifyFile(file, minImageSize)).rejects.toMatch(
        'File is not of a supported image type'
      );
    });
  });

  // Throws an error when given a file with dimensions smaller than the minimum size
  it('should throw an error when given a file with dimensions smaller than the minimum size', async () => {
    HTMLCanvasElement.prototype.toBlob = jest.fn();
    const minImageSize = 30;
    const canvas = document.createElement('canvas');
    canvas.width = minImageSize;
    canvas.height = minImageSize;
    canvas.toBlob(async blob => {
      const file = new File([blob], 'test.png', {
        type: 'image/png'
      });
      await expect(verifyFile(file, minImageSize)).rejects.toThrowError(
        'Image is too small'
      );
    });
  });

  // The returned object contains the correct mimeType property
  it('should return an object with the correct mimeType property', async () => {
    HTMLCanvasElement.prototype.toBlob = jest.fn();
    const minImageSize = 150;
    const canvas = document.createElement('canvas');
    canvas.width = minImageSize;
    canvas.height = minImageSize;
    canvas.toBlob(async blob => {
      const file = new File([blob], 'test.png', {
        type: 'image/png'
      });
      expect(verifyFile(file, minImageSize)).toHaveProperty(
        'mimeType',
        'image/png'
      );
    });
  });
});
