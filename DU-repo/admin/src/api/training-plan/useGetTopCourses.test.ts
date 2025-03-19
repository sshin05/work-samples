import { useQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react';
import { useGetTopCourses } from './useGetTopCourses';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useGetTopCourses', () => {
  it('should use hook without error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        getTopCourses: []
      }
    });

    const { result } = renderHook(() => useGetTopCourses());

    const {
      topCoursesMetricsLoading,
      topCoursesMetrics,
      topCoursesMetricsError
    } = result.current;

    expect(topCoursesMetricsLoading).toBe(false);
    expect(topCoursesMetrics).toEqual([]);
    expect(topCoursesMetricsError).toBe(null);
  });
});
