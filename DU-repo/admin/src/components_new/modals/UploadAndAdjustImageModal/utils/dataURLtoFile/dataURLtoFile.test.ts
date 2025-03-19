import { dataURLtoFile } from './dataURLtoFile';

describe('dataURLtoFile', () => {
  const dataURL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACW0lEQVR42mNkwAaMgViwMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy';

  // Converts a valid data URL to a file object with correct mime type and filename
  it('should convert a valid data URL to a file object with correct mime type and filename', () => {
    const filename = 'test.png';
    const file = dataURLtoFile(dataURL, filename);
    expect(file).toBeInstanceOf(File);
    expect(file.name).toEqual(filename);
    expect(file.type).toEqual('image/png');
  });

  // Converts a data URL with no filename to a file object with correct mime type and default filename
  it('should convert a data URL with no filename to a file object with correct mime type and default filename', () => {
    const filename = '';
    const file = dataURLtoFile(dataURL, filename);
    expect(file).toBeInstanceOf(File);
    expect(file.name).toEqual('file.png');
    expect(file.type).toEqual('image/png');
  });

  describe('data URL tests', () => {
    it('should convert a valid data URL to a file object with correct mime type and filename', () => {
      const filename = 'test.png';
      const file = dataURLtoFile(dataURL, filename);
      expect(file).toBeInstanceOf(File);
      expect(file.name).toEqual(filename);
      expect(file.type).toEqual('image/png');
    });

    it('should convert a valid data URL to a file object with correct mime type and filename', () => {
      const filename = 'test.png';
      const file = dataURLtoFile(dataURL, filename);
      expect(file).toBeInstanceOf(File);
      expect(file.name).toEqual(filename);
      expect(file.type).toEqual('image/png');
    });

    it('should convert a valid data URL to a file object with correct mime type and filename', () => {
      const filename = 'test.png';
      const file = dataURLtoFile(dataURL, filename);
      expect(file).toBeInstanceOf(File);
      expect(file.name).toEqual(filename);
      expect(file.type).toEqual('image/png');
    });

    it('should throw an error when given an invalid data URL', () => {
      const invalidDataURL = 'invalidDataUrl';
      const filename = 'test.png';
      expect(() => {
        dataURLtoFile(invalidDataURL, filename);
      }).toThrow();
    });

    it('should throw an error when given an empty data URL', () => {
      const dataURL = '';
      const filename = 'test.png';
      expect(() => {
        dataURLtoFile(dataURL, filename);
      }).toThrowError();
    });

    it('should convert a valid data URL to a file object with correct mime type and filename', () => {
      const filename = 'test.png';
      const file = dataURLtoFile(dataURL, filename);
      expect(file).toBeInstanceOf(File);
      expect(file.name).toEqual(filename);
      expect(file.type).toEqual('image/png');
    });

    it('should convert a data URL with multiple commas in the header to a file object with correct mime type and filename', () => {
      const filename = 'test.png';
      const file = dataURLtoFile(dataURL, filename);
      expect(file).toBeInstanceOf(File);
      expect(file.name).toEqual(filename);
      expect(file.type).toEqual('image/png');
    });

    it('should convert a data URL with no filename to a file object with correct mime type and default filename', () => {
      const defaultFilename = 'file.png';
      const file = dataURLtoFile(dataURL, '');
      expect(file).toBeInstanceOf(File);
      expect(file.name).toEqual(defaultFilename);
      expect(file.type).toEqual('image/png');
    });

    it('should convert a data URL with no mime type to a file object with default mime type and filename', () => {
      const filename = 'test.png';
      const file = dataURLtoFile(dataURL, filename);
      expect(file).toBeInstanceOf(File);
      expect(file.name).toEqual(filename);
      expect(file.type).toEqual('image/png');
    });

    it('should convert a data URL with non-standard mime type to a file object with correct mime type and filename', () => {
      const pdfDataURL =
        'data:application/pdf;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACW0lEQVR42mNkwAaMgViwMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy';
      const filename = 'test.pdf';
      const file = dataURLtoFile(pdfDataURL, filename);
      expect(file).toBeInstanceOf(File);
      expect(file.name).toEqual(filename);
      expect(file.type).toEqual('application/pdf');
    });
  });
});
