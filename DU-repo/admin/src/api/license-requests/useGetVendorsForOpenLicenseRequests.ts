import { gql, useQuery } from '@apollo/client';
import type {
  GetVendorsForOpenLicenseRequestQuery,
  GetVendorsForOpenLicenseRequestQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY: never[] = [];

export const useGetVendorsForOpenLicenseRequests = (
  missionPartnerId: GetVendorsForOpenLicenseRequestQueryVariables['missionPartnerId']
) => {
  const query = gql`
    query GetVendorsForOpenLicenseRequest($missionPartnerId: ID!) {
      getVendorsForOpenLicenseRequests(missionPartnerId: $missionPartnerId)
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    GetVendorsForOpenLicenseRequestQuery,
    GetVendorsForOpenLicenseRequestQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    },
    skip: !missionPartnerId
  });
  return {
    vendorsForOpenLicenseRequestsLoading: loading,
    vendorsForOpenLicenseRequestsError: error,
    vendorsForOpenLicenseRequests: (data?.getVendorsForOpenLicenseRequests ||
      STATIC_ARRAY) as GetVendorsForOpenLicenseRequestQuery['getVendorsForOpenLicenseRequests'],
    refetchRequests: refetch
  };
};
