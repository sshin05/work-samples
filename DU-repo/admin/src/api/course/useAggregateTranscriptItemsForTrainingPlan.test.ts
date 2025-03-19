import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useAggregateTranscriptItemsForTrainingPlan } from './useAggregateTranscriptItemsForTrainingPlan';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useAggregateTranscriptItemsForTrainingPlan', () => {
  const mockRefetch = jest.fn();

  const defaultOptions = {
    missionPartnerId: 'partner123',
    groupId: 'group123',
    planType: 'type1',
    planSourceId: 'source1',
    planVersion: 'v1'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null,
      refetch: mockRefetch
    });

    const { result } = renderHook(() =>
      useAggregateTranscriptItemsForTrainingPlan(defaultOptions)
    );

    expect(result.current.transcriptItemsLoading).toBe(true);
    expect(result.current.transcriptItemsError).toBeNull();
    expect(result.current.transcriptItems).toEqual([]);
  });

  it('should return error state', () => {
    const mockError = new Error('Network error');
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: mockError,
      data: null,
      refetch: mockRefetch
    });

    const { result } = renderHook(() =>
      useAggregateTranscriptItemsForTrainingPlan(defaultOptions)
    );

    expect(result.current.transcriptItemsLoading).toBe(false);
    expect(result.current.transcriptItemsError).toBe(mockError);
    expect(result.current.transcriptItems).toEqual([]);
  });

  it('should return data when query is successful', () => {
    const mockData = {
      aggregateTranscriptItemsForTrainingPlan: [
        {
          itemId: '1',
          itemTitle: 'Test Item',
          vendorName: 'Vendor A',
          total: 10,
          started: 5,
          stopped: 2,
          pendingReview: 1,
          markedCompleted: 1,
          completed: 8
        }
      ]
    };

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: mockData,
      refetch: mockRefetch
    });

    const { result } = renderHook(() =>
      useAggregateTranscriptItemsForTrainingPlan(defaultOptions)
    );

    expect(result.current.transcriptItemsLoading).toBe(false);
    expect(result.current.transcriptItemsError).toBeNull();
    expect(result.current.transcriptItems).toEqual(
      mockData.aggregateTranscriptItemsForTrainingPlan
    );
  });

  it('should call refetch when needed', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: null,
      refetch: mockRefetch
    });

    const { result } = renderHook(() =>
      useAggregateTranscriptItemsForTrainingPlan(defaultOptions)
    );

    result.current.refetchTranscriptCourses();

    expect(mockRefetch).toHaveBeenCalled();
  });
});
