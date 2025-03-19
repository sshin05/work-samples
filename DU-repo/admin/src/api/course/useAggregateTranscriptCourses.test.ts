import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useAggregateTranscriptCourses } from './useAggregateTranscriptCourses';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useAggregateTranscriptCourses', () => {
  const defaultOptions = {
    missionPartnerId: 'partner123',
    vendorId: 'vendor123',
    search: 'course search',
    sortField: 'title',
    sortDirection: 'asc',
    pageSize: 10,
    pageNumber: 1
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null
    });

    const { result } = renderHook(() =>
      useAggregateTranscriptCourses(defaultOptions)
    );

    expect(result.current.transcriptCoursesLoading).toBe(true);
    expect(result.current.transcriptCoursesError).toBeNull();
    expect(result.current.transcriptCoursesCount).toBe(0);
    expect(result.current.transcriptCoursesData).toBeUndefined();
  });

  it('should return error state', () => {
    const mockError = new Error('Network error');
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: mockError,
      data: null
    });

    const { result } = renderHook(() =>
      useAggregateTranscriptCourses(defaultOptions)
    );

    expect(result.current.transcriptCoursesLoading).toBe(false);
    expect(result.current.transcriptCoursesError).toBe(mockError);
    expect(result.current.transcriptCoursesCount).toBe(0);
    expect(result.current.transcriptCoursesData).toBeUndefined();
  });

  it('should return data when query is successful', () => {
    const mockData = {
      aggregateTranscriptCourses: {
        count: 1,
        data: [
          {
            courseId: 'course2',
            courseTitle: 'Course 2',
            vendorName: 'Vendor B',
            total: 20,
            started: 10,
            stopped: 2,
            pendingReview: 0,
            markedCompleted: 2,
            completed: 18
          }
        ]
      }
    };

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: mockData
    });

    const { result } = renderHook(() =>
      useAggregateTranscriptCourses(defaultOptions)
    );

    expect(result.current.transcriptCoursesLoading).toBe(false);
    expect(result.current.transcriptCoursesError).toBeNull();
    expect(result.current.transcriptCoursesCount).toBe(1);
    expect(result.current.transcriptCoursesData).toEqual(
      mockData.aggregateTranscriptCourses.data
    );
  });
});
