import { gql, useQuery } from '@apollo/client';
import type {
  GetBranchesForOpenLicenseRequestsQuery,
  GetBranchesForOpenLicenseRequestsQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY: never[] = [];

export const useGetBranchesForOpenLicenseRequest = (
  missionPartnerId: GetBranchesForOpenLicenseRequestsQueryVariables['missionPartnerId']
) => {
  const query = gql`
    query GetBranchesForOpenLicenseRequests($missionPartnerId: ID!) {
      getBranchesForOpenLicenseRequests(missionPartnerId: $missionPartnerId)
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    GetBranchesForOpenLicenseRequestsQuery,
    GetBranchesForOpenLicenseRequestsQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    },
    skip: !missionPartnerId
  });
  return {
    branchesForOpenLicenseRequestsLoading: loading,
    branchesForOpenLicenseRequestsError: error,
    branchesForOpenLicenseRequests: (data?.getBranchesForOpenLicenseRequests ||
      STATIC_ARRAY) as GetBranchesForOpenLicenseRequestsQuery['getBranchesForOpenLicenseRequests'],
    refetchRequests: refetch
  };
};
