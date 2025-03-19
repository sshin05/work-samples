import { renderHook } from '@@/test-utils';
import { useLazyQuery } from '@apollo/client';
import { useGetCourseProgress } from './useGetCourseProgress';

jest.mock('@apollo/client');

describe('useGetCourseProgress', () => {
  it('should return data', () => {
    const data = {
      getCourseProgress: {}
    };

    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        loading: false,
        error: null,
        data,
        refetch: jest.fn()
      }
    ]);

    const { result } = renderHook(() =>
      useGetCourseProgress({ groupId: 'id-1' })
    );

    expect(result.current.courseProgress).toEqual({});
    expect(result.current.courseProgressError).toBeNull();
    expect(result.current.courseProgressLoading).toBe(false);
    expect(result.current.fetchCourseProgress).toBeInstanceOf(Function);
  });

  it('should return null', () => {
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        loading: false,
        error: null,
        data: null
      }
    ]);

    const { result } = renderHook(() => useGetCourseProgress());

    expect(result.current.courseProgress).toEqual([]);
    expect(result.current.courseProgressError).toBeNull();
    expect(result.current.courseProgressLoading).toBe(false);
    expect(result.current.fetchCourseProgress).toBeInstanceOf(Function);
  });
});
