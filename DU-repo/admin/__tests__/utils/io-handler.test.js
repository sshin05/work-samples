import * as ioHandler from '@/utils/io-handler';

describe('download file', () => {
  it('should download file data as string with file name, mydocument.txt', () => {
    const data = 'sample text';
    ioHandler.downloadFile('mydocument.txt', data);
  });
  it('should catch error on download file data as string with file name, mydocument.txt', () => {
    const mockErrorFunc = jest.fn();
    jest.spyOn(document, 'createElement').mockImplementation(() => {
      throw new Error('Unable to create element');
    });
    ioHandler.downloadFile('undefined-document.txt', null, mockErrorFunc);

    expect(mockErrorFunc).toBeCalledWith('Unable to create element');
  });
});

describe('convert file to string', () => {
  let mockFileReader;
  let mockCallback;

  beforeEach(() => {
    mockCallback = jest.fn();
    mockFileReader = {
      readAsText: jest.fn(),
      addEventListener: jest.fn()
    };
    jest.spyOn(window, 'FileReader').mockReturnValue(mockFileReader);
  });

  it('should convert json data to csv and download', () => {
    const file = new File(['sample text'], 'mydocument.txt');

    let onloadRef;
    // Override Filereader's instance method onload
    jest
      .spyOn(mockFileReader, 'addEventListener')
      .mockImplementation((_, onload) => {
        onloadRef = onload;
      });

    ioHandler.convertFileToString(file, mockCallback);

    // Simulates file as loaded
    onloadRef({
      target: { result: 'sample text', fileName: 'mydocument.txt' }
    });

    expect(mockCallback).toBeCalledWith('sample text');
  });

  it('should log error if file cannot be converted', () => {
    const mockErrorFunc = jest.fn();
    const file = new File(['sample text'], 'non-existent.txt');

    let onerrorRef;
    // Override Filereader's instance method onload and onerror
    jest
      .spyOn(mockFileReader, 'addEventListener')
      .mockImplementation((listener, onerror) => {
        if (listener === 'error') {
          onerrorRef = onerror;
        }
      });

    ioHandler.convertFileToString(file, mockCallback, mockErrorFunc);

    // Simulates file as loaded
    onerrorRef({ target: { result: null, fileName: 'non-existent.txt' } });

    expect(mockErrorFunc).toBeCalledWith(
      'An error occurred while parsing non-existent.txt'
    );
  });
});
