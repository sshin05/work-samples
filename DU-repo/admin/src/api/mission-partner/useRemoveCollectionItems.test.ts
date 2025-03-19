import { useMutation } from '@apollo/client';
import { renderHook } from '@@/test-utils';
import { useRemoveCollectionItems } from './useRemoveCollectionItems';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: jest.fn(),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('useRemoveCollectionItems', () => {
  it('should return data', async () => {
    const mockRemoveCollectionItems = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockRemoveCollectionItems,
      {
        loading: false,
        error: false,
        data: null
      }
    ]);

    const { result } = renderHook(() => useRemoveCollectionItems());

    const { removeCollectionItems } = result.current;

    await removeCollectionItems(
      'collectionId',
      [
        { type: 'COURSE', courseId: 'courseId' },
        { type: 'ASSESSMENT', assessmentId: 'assessmentId' }
      ],
      'missionPartnerId'
    );

    expect(mockRemoveCollectionItems).toHaveBeenCalledWith({
      variables: {
        ID: 'collectionId',
        items: [
          { type: 'COURSE', courseId: 'courseId' },
          { type: 'ASSESSMENT', assessmentId: 'assessmentId' }
        ],
        missionPartnerId: 'missionPartnerId'
      }
    });
  });
});
