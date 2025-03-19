import { gql, useQuery } from '@apollo/client';
import type {
  CountActiveUsersByMissionPartnerIdQuery,
  CountActiveUsersByMissionPartnerIdQueryVariables
} from '@/api/codegen/graphql';

export const useCountActiveUsersByMissionPartnerId = (
  missionPartnerId: string
) => {
  const query = gql`
    query CountActiveUsersByMissionPartnerId($missionPartnerId: ID!) {
      countActiveUsersByMissionPartnerId(missionPartnerId: $missionPartnerId)
    }
  `;
  const { loading, error, data } = useQuery<
    CountActiveUsersByMissionPartnerIdQuery,
    CountActiveUsersByMissionPartnerIdQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    }
  });
  return {
    countActiveUsersLoading: loading,
    countActiveUsersError: error,
    countActiveUsers: data?.countActiveUsersByMissionPartnerId || 0
  };
};
