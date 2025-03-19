import { gql, useQuery } from '@apollo/client';

export const useGetLicensesByVendorId = (
  options // : GetLicensesByVendorIdQueryVariables
) => {
  const query = gql`
    query getLicensesByVendorId(
      $vendorId: ID!
      $missionPartnerName: String
      $branch: String
      $search: String
      $sortBy: String
      $sortDirection: String
      $pageSize: SafeInt
      $pageNumber: SafeInt
    ) {
      getLicensesByVendorId(
        vendorId: $vendorId
        missionPartnerName: $missionPartnerName
        branch: $branch
        search: $search
        sortBy: $sortBy
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
          user {
            branch
            trainingGroup
            metadata
          }
        }
        total
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    variables: {
      ...options
    }
  });
  return {
    licensesLoading: loading,
    licensesError: error,
    licenses: data?.getLicensesByVendorId || null
  };
};
