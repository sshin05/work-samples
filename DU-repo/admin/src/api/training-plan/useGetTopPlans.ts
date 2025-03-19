import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

export const useGetTopPlans = (
  options: {
    missionPartnerId?: string;
    limit?: number;
  } = {}
) => {
  const query = gql`
    query GetTopPlans($missionPartnerId: String, $limit: SafeInt) {
      getTopPlans(missionPartnerId: $missionPartnerId, limit: $limit) {
        title
        planType
        planSourceId
        count
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    variables: {
      missionPartnerId: options?.missionPartnerId,
      limit: options?.limit
    },
    fetchPolicy: 'cache-and-network'
  });
  return useMemo(
    () => ({
      getTopPlansLoading: loading,
      getTopPlansError: error,
      getTopPlansData: data?.getTopPlans || null
    }),
    [loading, error, data]
  );
};
