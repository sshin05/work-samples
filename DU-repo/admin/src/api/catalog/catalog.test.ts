import { useLazyQuery } from '@apollo/client';
import { useFindCatalogResults } from './useFindCatalogResults';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: jest.fn()
}));

describe('catalog test', () => {
  const mockRefetch = jest.fn();

  describe('useFindCatalogResults', () => {
    (useLazyQuery as jest.Mock).mockReturnValue([
      mockRefetch,
      {
        loading: false,
        error: false,
        data: {
          findCatalogResults: {}
        }
      }
    ]);

    it('should return useFindCatalogResults', () => {
      const { resultsLoading, resultsError, results, searchCatalog } =
        useFindCatalogResults();
      expect(resultsLoading).toBe(false);
      expect(resultsError).toBe(false);
      expect(results).toEqual({});
      expect(searchCatalog).toBeInstanceOf(Function);
    });
    it('should return refetch with a search query', async () => {
      const { resultsLoading, resultsError, results, searchCatalog } =
        useFindCatalogResults();
      expect(resultsLoading).toBe(false);
      expect(resultsError).toBe(false);
      expect(results).toEqual({});
      expect(searchCatalog).toBeInstanceOf(Function);
      await searchCatalog({ search: 'refetch' });
      expect(mockRefetch).toHaveBeenCalled();
    });
    it('should refetch search with no query', async () => {
      const { resultsLoading, resultsError, results, searchCatalog } =
        useFindCatalogResults();
      expect(resultsLoading).toBe(false);
      expect(resultsError).toBe(false);
      expect(results).toEqual({});
      expect(searchCatalog).toBeInstanceOf(Function);
      await searchCatalog({ search: '' });
      expect(mockRefetch).toHaveBeenCalled();
    });
    it('should return useFindCatalogResults', () => {
      const { resultsLoading, resultsError, results, searchCatalog } =
        useFindCatalogResults();
      expect(resultsLoading).toBe(false);
      expect(resultsError).toBe(false);
      expect(results).toEqual({});
      expect(searchCatalog).toBeInstanceOf(Function);
    });
  });
});
