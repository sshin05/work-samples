import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { FIND_LEARNERS_BY_SEARCH_QUERY } from './queries/FIND_LEARNERS_BY_SEARCH_QUERY';

interface FindLearnersBySearchInput {
  missionPartnerId: string;
  searchText: string;
  sortKey: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
}

export const useFindLearnersBySearch = ({
  missionPartnerId,
  searchText,
  sortKey,
  sortDirection,
  pageNumber,
  pageSize
}: FindLearnersBySearchInput) => {
  //TODO: add types here
  const { refetch, loading, error, data } = useQuery(
    FIND_LEARNERS_BY_SEARCH_QUERY,
    {
      variables: {
        missionPartnerId,
        searchText,
        sortKey,
        sortDirection,
        pageNumber,
        pageSize
      },
      skip: !missionPartnerId,
      fetchPolicy: 'no-cache'
    }
  );
  const total = useMemo(
    () => data?.findLearnersBySearch?.total || 0,
    [data?.findLearnersBySearch?.total]
  );
  return {
    learnersLoading: loading,
    learnersError: error,
    learners: data?.findLearnersBySearch?.records,
    refetchLearners: refetch,
    total
  };
};
