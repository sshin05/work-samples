import { gql, useQuery } from '@apollo/client';
import type {
  FindLicenseStatusCountsQuery,
  FindLicenseStatusCountsQueryVariables
} from '@/api/codegen/graphql';

export const useFindLicenseStatusCounts = (missionPartnerId: string) => {
  const query = gql`
    query FindLicenseStatusCounts($missionPartnerId: ID!) {
      findLicenseStatusCounts(missionPartnerId: $missionPartnerId) {
        active
        inactive
        available
        provisioned
        vendorId
        vendorName
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindLicenseStatusCountsQuery,
    FindLicenseStatusCountsQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    }
  });
  return {
    licenseStatusCountsLoading: loading,
    licenseStatusCountsError: error,
    licenseStatusCounts: data?.findLicenseStatusCounts,
    refetchLicenseStatusCounts: async (missionPartnerId: string) =>
      refetch({
        missionPartnerId
      })
  };
};
