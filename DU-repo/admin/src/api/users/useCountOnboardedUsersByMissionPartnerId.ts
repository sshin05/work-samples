import { gql, useQuery } from '@apollo/client';
import type {
  CountOnboardedUsersByMissionPartnerIdQuery,
  CountOnboardedUsersByMissionPartnerIdQueryVariables
} from '@/api/codegen/graphql';

export const useCountOnboardedUsersByMissionPartnerId = (
  missionPartnerId: string
) => {
  const query = gql`
    query CountOnboardedUsersByMissionPartnerId($missionPartnerId: ID!) {
      countOnboardedUsersByMissionPartnerId(missionPartnerId: $missionPartnerId)
    }
  `;
  const { loading, error, data } = useQuery<
    CountOnboardedUsersByMissionPartnerIdQuery,
    CountOnboardedUsersByMissionPartnerIdQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    }
  });
  return {
    countOnboardedUsersLoading: loading,
    countOnboardedUsersError: error,
    countOnboardedUsers: data?.countOnboardedUsersByMissionPartnerId || 0
  };
};
