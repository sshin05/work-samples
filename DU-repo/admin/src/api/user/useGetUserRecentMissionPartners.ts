import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

export const useGetUserRecentMissionPartners = () => {
  const query = gql`
    query GetRecentMissionPartners {
      getUser {
        recentMissionPartners {
          missionPartnerId
          missionPartnerName
          visitedAt
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    fetchPolicy: 'network-only'
  });

  const recentMissionPartners = useMemo(() => {
    if (data?.getUser.recentMissionPartners?.length === 1) return [];
    return data?.getUser.recentMissionPartners;
  }, [data?.getUser.recentMissionPartners]);

  return {
    recentMissionPartnersuserLoading: loading,
    recentMissionPartnersError: error,
    recentMissionPartners
  };
};
