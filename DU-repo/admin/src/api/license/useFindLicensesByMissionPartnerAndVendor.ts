import { gql, useQuery } from '@apollo/client';

export const useFindLicensesByMissionPartnerAndVendor = (
  options // : FindLicensesByMissionPartnerAndVendorQueryVariables
) => {
  const query = gql`
    query FindLicensesByMissionPartnerAndVendor(
      $missionPartnerId: ID!
      $vendorId: ID!
      $search: String
      $sortField: String
      $sortDirection: String
      $pageSize: SafeInt
      $pageNumber: SafeInt
    ) {
      findLicensesByMissionPartnerAndVendor(
        missionPartnerId: $missionPartnerId
        vendorId: $vendorId
        search: $search
        sortField: $sortField
        sortDirection: $sortDirection
        pageSize: $pageSize
        pageNumber: $pageNumber
      ) {
        records {
          vendorId
          vendorName
          userId
          userFirstName
          userLastName
          userEmail
          missionPartnerId
          missionPartnerName
          assignedAt
          lastUsedAt
        }
        total
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(query, {
    variables: {
      ...options
    },
    skip: !options?.vendorId || !options?.missionPartnerId
  });

  return {
    licensesLoading: loading,
    licensesError: error,
    licenses: data?.findLicensesByMissionPartnerAndVendor.records,
    licensesTotal: data?.findLicensesByMissionPartnerAndVendor.total || 0,
    refetchLicenses: refetch
  };
};
