import { renderHook } from '@@/test-utils';
import { useFindLearnersTotal } from './useFindLearnersTotal';
import { useQuery } from '@apollo/client';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn()
}));

describe('useFindLearnersTotal', () => {
  it('should return total learners and loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: { findLearnersBySearch: { total: 10 } },
      refetch: jest.fn()
    });

    const { result } = renderHook(() =>
      useFindLearnersTotal({ missionPartnerId: '1' })
    );

    const { learnersTotal, findLearnersTotalLoading, findLearnersTotalError } =
      result.current;

    expect(learnersTotal).toEqual(10);
    expect(findLearnersTotalLoading).toEqual(false);
    expect(findLearnersTotalError).toBeUndefined();
  });
});
