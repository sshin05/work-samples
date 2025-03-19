import { renderHook, act } from '@@/test-utils';
import { useLazyQuery } from '@apollo/client';
import { useFindCourseById } from './useFindCourseById';

jest.mock('@apollo/client');

describe('useFindCourseById', () => {
  it('should fetch course by ID without error', () => {
    const mockFetch = jest.fn();
    (useLazyQuery as jest.Mock).mockReturnValue([
      mockFetch,
      {
        loading: false,
        error: null,
        data: { findCourseById: { courseTitle: 'Course Title' } }
      }
    ]);

    const { result } = renderHook(() => useFindCourseById());

    expect(result.current.courseById.courseTitle).toBe('Course Title');

    act(() => result.current.fetchCourse({ id: 'courseId' }));
    expect(mockFetch).toHaveBeenCalledWith({ variables: { id: 'courseId' } });
  });
});
