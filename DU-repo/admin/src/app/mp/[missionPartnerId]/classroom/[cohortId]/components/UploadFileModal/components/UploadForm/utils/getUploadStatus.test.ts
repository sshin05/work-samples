import { getUploadStatus } from './getUploadStatus';

describe('getUploadStatus', () => {
  it('returns "error" when didError is true', () => {
    const status = getUploadStatus({
      isUploading: false,
      didError: true,
      didUpload: false
    });
    expect(status).toBe('error');
  });

  it('returns "processing" when isUploading is true', () => {
    const status = getUploadStatus({
      isUploading: true,
      didError: false,
      didUpload: false
    });
    expect(status).toBe('processing');
  });

  it('returns "done" when didUpload is true', () => {
    const status = getUploadStatus({
      isUploading: false,
      didError: false,
      didUpload: true
    });
    expect(status).toBe('done');
  });

  it('returns "todo" when no conditions are met', () => {
    const status = getUploadStatus({
      isUploading: false,
      didError: false,
      didUpload: false
    });
    expect(status).toBe('todo');
  });
});
