import { useMutation } from '@apollo/client';
import { renderHook } from '@@/test-utils';
import { useCreateCollection } from './useCreateCollection';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: jest.fn(),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('useCreateCollection', () => {
  it('should return data', async () => {
    const mockCreateCollection = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockCreateCollection,
      {
        loading: false,
        error: false,
        data: null
      }
    ]);

    const { result } = renderHook(() => useCreateCollection());

    const { createCollection } = result.current;

    await createCollection('collectionName', 'description', 'missionPartnerId');

    expect(mockCreateCollection).toHaveBeenCalledWith({
      variables: {
        name: 'collectionName',
        description: 'description',
        missionPartnerId: 'missionPartnerId'
      }
    });
  });
});
