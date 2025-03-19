import { renderHook, act } from '@@/test-utils';
import { useLazyQuery } from '@apollo/client';
import { useGetMetricsByGroupIdCourseId } from './useGetMetricsByGroupIdCourseId';

jest.mock('@apollo/client');

describe('useGetMetricsByGroupIdCourseId', () => {
  it('should fetch metrics without error', () => {
    const mockFetch = jest.fn();
    (useLazyQuery as jest.Mock).mockReturnValue([
      mockFetch,
      {
        loading: false,
        error: null,
        data: { getMetricsByGroupIdCourseId: [{ status: 'Started' }] }
      }
    ]);

    const { result } = renderHook(() => useGetMetricsByGroupIdCourseId());

    expect(result.current.metrics[0].status).toBe('Started');

    // NOTE! --> the implementation of this isn't using `variables` like the type requires.
    act(() =>
      result.current.fetchMetrics({
        variables: { groupId: 'groupId', courseId: 'courseId' }
      })
    );
    expect(mockFetch).toHaveBeenCalledWith({
      variables: { groupId: 'groupId', courseId: 'courseId' }
    });
  });
});
