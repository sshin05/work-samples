import { gql, useQuery } from '@apollo/client';
import type {
  FindMissionPartnerMinDetailsQuery,
  FindMissionPartnerMinDetailsQueryVariables
} from '@/api/codegen/graphql';

export const useFindMissionPartnerMinDetails = (id: string) => {
  const query = gql`
    query FindMissionPartnerMinDetails($id: ID!) {
      findMissionPartnerMinDetails(id: $id) {
        id
        name
        slug
        description
        affiliateId
        logoUrl
        accessCode
        customTrainingEnabled
        trialEnabled
        trialStartDate
        trialEndDate
        isMarketplaceEnabled
      }
    }
  `;
  const { refetch, data, loading, error } = useQuery<
    FindMissionPartnerMinDetailsQuery,
    FindMissionPartnerMinDetailsQueryVariables
  >(query, {
    variables: {
      id
    },
    skip: !id
  });
  const response = {
    missionPartnerMinDetails: data?.findMissionPartnerMinDetails || null,
    missionPartnerMinDetailsError: error,
    missionPartnerMinDetailsLoading: loading,
    refetchMissionPartnerMinDetails: refetch
  };
  return response;
};
