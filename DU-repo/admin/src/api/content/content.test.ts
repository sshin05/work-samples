import { useContent } from './useContent';
import { useDeleteBanner } from './useDeleteBanner';
import { useUpdateBanner } from './useUpdateBanner';
import { useRemoveAlertBanner } from './useRemoveAlertBanner';
import { useUpdateAlertBanner } from './useUpdateAlertBanner';

const mockGql = jest.fn(_query => 'query');

const mockContent = jest.fn();
const mockFindContentById = jest.fn(() => ({
  content: mockContent()
}));
const mockData = jest.fn(() => ({
  findContentById: mockFindContentById()
}));
const mockUseQuery = jest.fn((_query, _options) => ({
  loading: 'loading',
  error: 'error',
  data: mockData(),
  refetch: 'refetch'
}));

const mockFunction = jest.fn();
const mockMutationLoading = jest.fn(() => 'mutationLoading');
const mockMutationError = jest.fn(() => 'mutationError');
const mockUseMutation = jest.fn(_mutation => [
  options => mockFunction(options),
  { loading: mockMutationLoading(), error: mockMutationError() }
]);

jest.mock('@apollo/client', () => ({
  gql: query => mockGql(query),
  useQuery: (query, options) => mockUseQuery(query, options),
  useMutation: mutation => mockUseMutation(mutation)
}));

const CONTENT_QUERY = `
    query FindContentById($id: ID!) {
      findContentById(id: $id) {
        id
        content
      }
    }
  `;

const UPDATE_ALERT_BANNER_MUTATION = `
    mutation updateGlobalBanner(
      $title: String
      $content: String!
      $isDismissable: Boolean!
    ) {
      updateAlertBanner(
        title: $title
        content: $content
        isDismissable: $isDismissable
      ) {
        id
        content {
          title
          content
          isDismissable
        }
      }
    }
  `;

const REMOVE_ALERT_BANNER_MUTATION = `
    mutation deleteAlertBanner {
      deleteAlertBanner
    }
  `;

describe('content', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('useContent', () => {
    it('should call useQuery with correct arguments and then return correct object', () => {
      mockContent.mockImplementationOnce(() => 'content');
      const returnValue = useContent('abc');

      expect(mockGql).toHaveBeenCalledWith([CONTENT_QUERY]);
      expect(mockUseQuery).toHaveBeenCalledWith('query', {
        variables: {
          id: 'abc'
        }
      });

      expect(returnValue.contentLoading).toBe('loading');
      expect(returnValue.contentError).toBe('error');
      expect(returnValue.content).toBe('content');
      expect(returnValue.refetchContent).toBe('refetch');
    });

    it('it should return a static object when content is falsy', () => {
      mockContent.mockImplementationOnce(() => undefined);
      const returnValue = useContent('abc');

      expect(returnValue.content).toStrictEqual({});
    });
  });

  describe('useUpdateAlertBanner', () => {
    it('should call useMutation with correct arguments and the return correct object', () => {
      const returnHooks = useUpdateAlertBanner();

      expect(mockGql).toHaveBeenCalledWith([UPDATE_ALERT_BANNER_MUTATION]);
      expect(mockUseMutation).toHaveBeenCalledWith('query');

      expect(returnHooks.updateAlertBanner).toStrictEqual(expect.any(Function));
      expect(returnHooks.updateAlertBannerLoading).toBe('mutationLoading');
      expect(returnHooks.updateAlertBannerError).toBe('mutationError');

      returnHooks.updateAlertBanner('title', 'content', true);

      expect(mockFunction).toHaveBeenCalledWith({
        variables: {
          content: 'content',
          isDismissable: true,
          title: 'title'
        }
      });
    });
  });

  describe('useRemoveAlertBanner', () => {
    it('should call useMutation with correct arguments and the return correct object', () => {
      const returnHooks = useRemoveAlertBanner();

      expect(mockGql).toHaveBeenCalledWith([REMOVE_ALERT_BANNER_MUTATION]);
      expect(mockUseMutation).toHaveBeenCalledWith('query');

      expect(returnHooks.removeAlertBanner).toStrictEqual(expect.any(Function));
      expect(returnHooks.removeAlertBannerLoading).toBe('mutationLoading');
      expect(returnHooks.removeAlertBannerError).toBe('mutationError');

      returnHooks.removeAlertBanner();

      expect(mockFunction).toHaveBeenCalled();
    });
  });
  describe('updateBanner', () => {
    it('should use updateBanner hook without error', () => {
      const returnHooks = useUpdateBanner();

      expect(returnHooks.updateBanner).toStrictEqual(expect.any(Function));
      expect(returnHooks.updateBannerLoading).toBe('mutationLoading');
      expect(returnHooks.content).toBeUndefined();
      expect(returnHooks.updateBannerError).toBe('mutationError');
      expect(returnHooks.updateBanner).toBeDefined();

      returnHooks.updateBanner(
        'title',
        'body',
        'buttontext',
        'buttonlink',
        'logo'
      );

      expect(mockFunction).toHaveBeenCalledWith({
        variables: {
          title: 'title',
          body: 'body',
          buttonText: 'buttontext',
          buttonLink: 'buttonlink',
          logo: 'logo'
        }
      });
    });
  });
  describe('deleteBanner', () => {
    it('should use deleteBanner hook without error', () => {
      const returnHooks = useDeleteBanner();

      expect(mockUseMutation).toHaveBeenCalledWith('query');

      expect(returnHooks.deleteBanner).toStrictEqual(expect.any(Function));
      expect(returnHooks.deleteBannerLoading).toBe('mutationLoading');
      expect(returnHooks.deleteBannerError).toBe('mutationError');

      returnHooks.deleteBanner();

      expect(mockFunction).toHaveBeenCalled();
    });
  });
});
