import { onDropFile } from '@/utils/onDropLibraryItemFile';

describe('onDropFile', () => {
  it('should return values for type File', () => {
    expect(
      onDropFile(
        [
          {
            path: 'blah.png',
            name: 'blah.png',
            type: 'image/png',
            file: new File(['content'], 'blah', { type: 'image/png' })
          }
        ],
        []
      )
    ).toEqual(
      expect.objectContaining({
        hasFile: true,
        file: new File(['content'], 'blah', { type: 'image/png' }),
        value: 'File'
      })
    );
  });
  it('should return values for type Video', () => {
    expect(
      onDropFile(
        [
          {
            path: 'blah.mp4',
            name: 'blah.mp4',
            type: 'video/mp4',
            file: new File(['content'], 'blah', {
              type: 'video/mp4'
            })
          }
        ],
        []
      )
    ).toEqual(
      expect.objectContaining({
        hasFile: true,
        file: new File(['content'], 'blah', {
          type: 'video/mp4'
        }),
        value: 'Video'
      })
    );
  });
  it('should return values for type Video', () => {
    expect(
      onDropFile(
        [
          {
            path: 'blah.mp3',
            name: 'blah.mp3',
            type: 'audio/mp3',
            file: new File(['content'], 'blah', {
              type: 'audio/mp3'
            })
          }
        ],
        ['.mp3']
      )
    ).toEqual(
      expect.objectContaining({
        hasFile: true,
        file: new File(['content'], 'blah', {
          type: 'audio/mp3'
        }),
        value: 'Audio'
      })
    );
  });
});
