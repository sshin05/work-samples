import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useFindCoursesBySource } from './useFindCoursesBySource';

jest.mock('@apollo/client');

describe('useFindCoursesBySource', () => {
  it('should fetch courses by source without error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: { findCoursesBySource: { total: 5 } }
    });

    const { result } = renderHook(() => useFindCoursesBySource('sourceA'));

    expect(result.current.total).toBe(5);
  });
});
