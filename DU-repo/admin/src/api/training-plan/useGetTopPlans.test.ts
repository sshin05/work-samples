import { useQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react';
import { useGetTopPlans } from './useGetTopPlans';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useGetTopPlans', () => {
  it('should use hook without error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        getTopPlans: []
      }
    });

    const { result } = renderHook(() => useGetTopPlans());

    const { getTopPlansData, getTopPlansError, getTopPlansLoading } =
      result.current;

    expect(getTopPlansLoading).toBe(false);
    expect(getTopPlansData).toEqual([]);
    expect(getTopPlansError).toBe(null);
  });
});
