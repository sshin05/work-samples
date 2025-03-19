import { gql, useQuery } from '@apollo/client';
import type {
  FindAllMissionPartnersMinDetailsQuery,
  FindAllMissionPartnersMinDetailsQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useFindAllMissionPartnersMinDetails = () => {
  const query = gql`
    query FindAllMissionPartnersMinDetails {
      findAllMissionPartnersMinDetails {
        id
        name
        slug
        description
        affiliateId
        logoUrl
        accessCode
        customTrainingEnabled
        trialEnabled
        trialEndDate
        sectionType
        isMarketplaceEnabled
      }
    }
  `;
  const { refetch, data, loading, error } = useQuery<
    FindAllMissionPartnersMinDetailsQuery,
    FindAllMissionPartnersMinDetailsQueryVariables
  >(query);
  return {
    missionPartnersMinDetails: (data?.findAllMissionPartnersMinDetails ||
      STATIC_ARRAY) as FindAllMissionPartnersMinDetailsQuery['findAllMissionPartnersMinDetails'],
    missionPartnersMinDetailsLoading: loading,
    missionPartnersMinDetailsError: error,
    refetchMissionPartnersMinDetails: refetch
  };
};
