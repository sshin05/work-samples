import { useQuery, useMutation } from '@apollo/client';
import { useGetUserDownloads } from './useGetUserDownloads';
import { useDeleteDownload } from './useDeleteDownload';

jest.mock('@apollo/client');

describe('downloads test', () => {
  describe('useGetUserDownloads', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: {
          getUserDownloads: []
        }
      });
    });

    it('should return data', () => {
      const { downloads, downloadsLoading, downloadsError, refetchDownloads } =
        useGetUserDownloads('1');

      expect(downloads).toEqual([]);
      expect(downloadsLoading).toEqual(false);
      expect(downloadsError).toEqual(null);
      expect(refetchDownloads).toBeInstanceOf(Function);
    });
  });

  describe('useDeleteDownload', () => {
    const _deleteDownload = jest.fn();

    useMutation.mockReturnValue([
      _deleteDownload,
      {
        loading: false,
        error: false,
        data: {
          deleteDownload: {}
        }
      }
    ]);

    beforeEach(() => useMutation.mockClear());

    it('should return useDeleteDownload', async () => {
      const deleteDownloadHook = useDeleteDownload();

      expect(deleteDownloadHook.deleteDownloadLoading).toEqual(false);
      expect(deleteDownloadHook.deleteDownloadError).toEqual(false);
      expect(deleteDownloadHook.deleteDownloadData).toEqual({});
      expect(deleteDownloadHook.deleteDownload).toBeInstanceOf(Function);
    });
  });
});
