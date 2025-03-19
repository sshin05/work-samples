import { useMutation } from '@apollo/client';
import { renderHook } from '@@/test-utils';
import { useUpdateCollection } from './useUpdateCollection';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: jest.fn(),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('useUpdateCollection', () => {
  it('should return data', async () => {
    const mockUpdateCollection = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockUpdateCollection,
      {
        loading: false,
        error: false,
        data: null
      }
    ]);

    const { result } = renderHook(() => useUpdateCollection());

    const { updateCollection } = result.current;

    await updateCollection(
      'collectionId',
      'collectionName',
      'description',
      'missionPartnerId'
    );
    expect(mockUpdateCollection).toHaveBeenCalledWith({
      variables: {
        Id: 'collectionId',
        name: 'collectionName',
        description: 'description',
        missionPartnerId: 'missionPartnerId'
      }
    });
  });
});
