import { gql, useQuery } from '@apollo/client';
import type {
  GetPublicMissionPartnerExportsQuery,
  GetPublicMissionPartnerExportsQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

// TODO: Remove - if hook is not used
export const useGetPublicMissionPartnerExports = (missionPartnerId: string) => {
  const query = gql`
    query GetPublicMissionPartnerExports($missionPartnerId: ID!) {
      getPublicMissionPartnerExports(missionPartnerId: $missionPartnerId) {
        id
        name
        description
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    GetPublicMissionPartnerExportsQuery,
    GetPublicMissionPartnerExportsQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    },
    skip: !missionPartnerId
  });
  return {
    fetchPublicMissionPartnerExports: (missionPartnerId: string) =>
      refetch({
        missionPartnerId
      }),
    getPublicMissionPartnerExportsLoading: loading,
    getPublicMissionPartnerExportsError: error,
    getPublicMissionPartnerExportsData: (data?.getPublicMissionPartnerExports ||
      STATIC_ARRAY) as GetPublicMissionPartnerExportsQuery['getPublicMissionPartnerExports']
  };
};
