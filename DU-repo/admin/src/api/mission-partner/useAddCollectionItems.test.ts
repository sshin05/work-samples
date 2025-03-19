import { useMutation } from '@apollo/client';
import { renderHook } from '@@/test-utils';
import { useAddCollectionItems } from './useAddCollectionItems';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: jest.fn(),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('useAddCollectionItems', () => {
  it('should return data', async () => {
    const mockAddCollectionItems = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockAddCollectionItems,
      {
        loading: false,
        error: false,
        data: null
      }
    ]);

    const { result } = renderHook(() => useAddCollectionItems());

    const { addCollectionItems } = result.current;

    await addCollectionItems(
      'collectionId',
      [
        { type: 'COURSE', courseId: 'courseId' },
        { type: 'ASSESSMENT', assessmentId: 'assessmentId' }
      ],
      'missionPartnerId'
    );

    expect(mockAddCollectionItems).toHaveBeenCalledWith({
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
