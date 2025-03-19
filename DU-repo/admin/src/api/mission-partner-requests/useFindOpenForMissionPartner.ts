import { gql, useQuery } from '@apollo/client';
import type {
  FindOpenForMissionPartnerQuery,
  FindOpenForMissionPartnerQueryVariables
} from '@/api/codegen/graphql';

export const useFindOpenForMissionPartner = (missionPartnerId: string) => {
  const query = gql`
    query FindOpenForMissionPartner($missionPartnerId: ID!) {
      findOpenForMissionPartner(missionPartnerId: $missionPartnerId) {
        missionPartnerId
        missionPartnerName
        userId
        userFirstName
        userLastName
        userEmail
        status
        requestedAt
        approvedAt
        declinedAt
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindOpenForMissionPartnerQuery,
    FindOpenForMissionPartnerQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    }
  });
  return {
    findOpenForMissionPartnerLoading: loading,
    findOpenForMissionPartnerError: error,
    findOpenForMissionPartnerData: data?.findOpenForMissionPartner,
    refetchFindOpenForMissionPartner: refetch
  };
};
