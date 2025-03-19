import { useQuery } from '@apollo/client';
import { useFindLearnersBySearch } from './useFindLearnersBySearch';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useMemo: jest.fn()
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('useFindLearnersBySearch', () => {
  it('should return learners', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined,
      refetch: jest.fn()
    });

    const result = useFindLearnersBySearch({
      missionPartnerId: '1',
      searchText: 'test',
      sortKey: 'test',
      sortDirection: 'test',
      pageNumber: 1,
      pageSize: 10
    });

    expect(result.learnersLoading).toEqual(false);
    expect(result.learnersError).toEqual(undefined);
    expect(result.learners).toEqual(undefined);
  });
});
