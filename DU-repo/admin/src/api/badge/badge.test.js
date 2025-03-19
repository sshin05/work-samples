import { useMutation } from '@apollo/client';
import { useExportBadges } from './useExportBadges';

jest.mock('@apollo/client');

describe('badges test', () => {
  describe('useExportBadges', () => {
    it('should return function loading and error', () => {
      useMutation.mockReturnValue([jest.fn(), { loading: false, error: null }]);
      const { exportBadgesError, exportBadgesLoading, exportBadges } =
        useExportBadges();

      expect(exportBadgesError).toEqual(null);
      expect(exportBadgesLoading).toEqual(false);
      expect(exportBadges.constructor.name).toBe('AsyncFunction');
    });
  });
});
