import { promises } from 'node:fs';
import path from 'node:path';
import { getBase64 } from './getBase64';

describe('getBase64', () => {
  let image;

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

  it('should get the base64 of the image', async () => {
    const base64 = await getBase64(image);

    // WE SHOULD ACTUALLY JUST FIX THIS, BUT...
    // eslint-disable-next-line sonarjs/duplicates-in-character-class
    expect(base64).toMatch(/[a-z\\d]+/i);
    expect(base64.length).toEqual(15_436);
  });
});
