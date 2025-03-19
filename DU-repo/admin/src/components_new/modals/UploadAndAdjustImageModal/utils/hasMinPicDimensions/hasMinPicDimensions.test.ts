import { promises } from 'node:fs';
import path from 'node:path';
import { getBase64 } from '../getBase64';
import { hasMinPicDimensions } from './hasMinPicDimensions';

describe('hasMinPicDimensions', () => {
  let image: File;

  beforeAll(async () => {
    const imageBuffer = await promises.readFile(
      path.join(__dirname, 'white_256x256.png')
    );
    image = new File(
      Array.prototype.slice.call(imageBuffer, 0),
      'white_256x256',
      {
        type: 'image/png'
      }
    );
  }, 5000);

  it('should resolve the image if its dimensions are large enough', async () => {
    // eslint-disable-next-line func-names
    Image.prototype.decode = () =>
      new Promise(resolve => {
        resolve({
          width: 256,
          height: 256
        });
      });

    const result = await hasMinPicDimensions(
      {
        mimeType: image.type,
        base64: await getBase64(image)
      },
      151
    );

    expect(result).toBe(true);
  });

  it('should throw error if dimensions are too small', async () => {
    // Image decode method does not exist in Jest
    // eslint-disable-next-line func-names
    Image.prototype.decode = () =>
      new Promise(resolve => {
        resolve({
          width: 256,
          height: 256
        });
      });

    try {
      await hasMinPicDimensions(
        {
          mimeType: image.type,
          base64: await getBase64(image)
        },
        1024
      );
    } catch (error) {
      expect(error.message).toBe('Image is too small');
    }
  });

  it('should throw error if the file uploaded is not an image', async () => {
    // Image decode method does not exist in Jest
    // eslint-disable-next-line func-names
    Image.prototype.decode = function () {
      this.width = 256;
      this.height = 256;
    };

    try {
      await hasMinPicDimensions(
        {
          mimeType: 'application/json',
          base64: await getBase64(image)
        },
        151
      );
    } catch (error) {
      expect(error.message).toBe('File is not of a supported image type');
    }
  });
});
