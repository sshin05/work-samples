import { gql, useQuery } from '@apollo/client';
import type {
  CountUsersByMissionPartnerIdQuery,
  CountUsersByMissionPartnerIdQueryVariables
} from '@/api/codegen/graphql';

export const useCountUsersByMissionPartnerId = (missionPartnerId: string) => {
  const query = gql`
    query CountUsersByMissionPartnerId($missionPartnerId: ID!) {
      countUsersByMissionPartnerId(missionPartnerId: $missionPartnerId)
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    CountUsersByMissionPartnerIdQuery,
    CountUsersByMissionPartnerIdQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    },
    skip: !missionPartnerId
  });
  return {
    countAllUsersLoading: loading,
    countAllUsersError: error,
    countAllUsers: data?.countUsersByMissionPartnerId || 0,
    refetchCountMissionPartnerUsers: refetch
  };
};
