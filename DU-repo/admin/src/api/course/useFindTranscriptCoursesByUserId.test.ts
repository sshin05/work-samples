import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useFindTranscriptCoursesByUserId } from './useFindTranscriptCoursesByUserId';

jest.mock('@apollo/client');

describe('useFindTranscriptCoursesByUserId', () => {
  it('should fetch transcript courses without error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        findTranscriptCoursesByUserId: {
          data: [{ id: '1', courseTitle: 'Course 1' }],
          total: 1
        }
      }
    });

    const { result } = renderHook(() =>
      useFindTranscriptCoursesByUserId('userId')
    );

    expect(result.current.transcriptCourses).toEqual([
      { id: '1', courseTitle: 'Course 1' }
    ]);
    expect(result.current.total).toBe(1);
    expect(result.current.transcriptCoursesLoading).toBe(false);
    expect(result.current.transcriptCoursesError).toBeNull();
  });

  it('should return an empty array and total 0 when data is undefined', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: undefined
    });

    const { result } = renderHook(() =>
      useFindTranscriptCoursesByUserId('userId')
    );

    expect(result.current.transcriptCourses).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.transcriptCoursesLoading).toBe(false);
    expect(result.current.transcriptCoursesError).toBeNull();
  });

  it('should handle loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null
    });

    const { result } = renderHook(() =>
      useFindTranscriptCoursesByUserId('userId')
    );

    expect(result.current.transcriptCoursesLoading).toBe(true);
    expect(result.current.transcriptCoursesError).toBeNull();
    expect(result.current.transcriptCourses).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it('should handle error state', () => {
    const mockError = new Error('Network error');

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: mockError,
      data: null
    });

    const { result } = renderHook(() =>
      useFindTranscriptCoursesByUserId('userId')
    );

    expect(result.current.transcriptCoursesError).toBe(mockError);
    expect(result.current.transcriptCoursesLoading).toBe(false);
    expect(result.current.transcriptCourses).toEqual([]);
    expect(result.current.total).toBe(0);
  });
});
