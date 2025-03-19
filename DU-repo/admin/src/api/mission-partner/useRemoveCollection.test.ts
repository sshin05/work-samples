import { useMutation } from '@apollo/client';
import { renderHook } from '@@/test-utils';
import { useRemoveCollection } from './useRemoveCollection';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: jest.fn(),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('useRemoveCollection', () => {
  it('should return data', async () => {
    const mockRemoveCollection = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockRemoveCollection,
      {
        loading: false,
        error: false,
        data: null
      }
    ]);

    const { result } = renderHook(() => useRemoveCollection());

    const { removeCollection } = result.current;

    await removeCollection('collectionId', 'missionPartnerId');

    expect(mockRemoveCollection).toHaveBeenCalledWith({
      variables: {
        Id: 'collectionId',
        missionPartnerId: 'missionPartnerId'
      }
    });
  });
});
