import { gql, useQuery } from '@apollo/client';

const STATIC_OBJECT: unknown = {};

// missionPartnerId: FindOpenLicenseRequestsQueryVariables['missionPartnerId']

export const useFindOpenLicenseRequests = (
  missionPartnerId?: string | null
) => {
  const query = gql`
    query FindOpenLicenseRequests($missionPartnerId: ID!) {
      findOpenLicenseRequests(missionPartnerId: $missionPartnerId) {
        records {
          missionPartnerId
          missionPartnerName
          vendorId
          vendorName
          userId
          userFirstName
          userLastName
          userEmail
          userOrganization
          id
          status
          requestedAt
          approvedAt
          declinedAt
        }
        total
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery(query, {
    variables: {
      missionPartnerId
    },
    skip: !missionPartnerId
  });
  return {
    requestsLoading: loading,
    requestsError: error,
    requests: data?.findOpenLicenseRequests || STATIC_OBJECT, // as FindOpenLicenseRequestsQuery['findOpenLicenseRequests'],
    refetchRequests: refetch
  };
};
