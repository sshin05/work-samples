import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';

interface FindLearnersBySearchInput {
  missionPartnerId: string;
}

export const useFindLearnersTotal = ({
  missionPartnerId
}: FindLearnersBySearchInput) => {
  const query = gql`
    query FindLearnersTotal($missionPartnerId: ID!) {
      findLearnersBySearch(missionPartnerId: $missionPartnerId) {
        total
      }
    }
  `;

  const { refetch, loading, error, data } = useQuery(query, {
    variables: {
      missionPartnerId
    },
    skip: !missionPartnerId
  });

  const learnersTotal = useMemo(
    () => data?.findLearnersBySearch?.total || 0,
    [data?.findLearnersBySearch?.total]
  );

  return {
    findLearnersTotalLoading: loading,
    findLearnersTotalError: error,
    refetchLearnersTotal: refetch,
    learnersTotal
  };
};
