import { gql, useQuery } from '@apollo/client';
import type {
  FindLicenseRequestByIdQuery,
  FindLicenseRequestByIdQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY: never[] = [];

export const useFindLicenseRequestById = (
  id: FindLicenseRequestByIdQueryVariables['id']
) => {
  const query = gql`
    query findLicenseRequestById($id: ID!) {
      findLicenseRequestById(id: $id) {
        vendorId
        vendorName
        userId
        userFirstName
        userLastName
        userEmail
        userOrganization
        status
        requestedAt
        approvedAt
        declinedAt
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindLicenseRequestByIdQuery,
    FindLicenseRequestByIdQueryVariables
  >(query, {
    variables: {
      id
    }
  });
  const useRefetch = async (id: FindLicenseRequestByIdQueryVariables['id']) =>
    refetch({
      id
    });
  return {
    licenseRequestsByIdLoading: loading,
    licenseRequestsByIdError: error,
    licenseRequestsById: (data?.findLicenseRequestById ||
      STATIC_ARRAY) as FindLicenseRequestByIdQuery['findLicenseRequestById'],
    refetchLicenseRequestsById: useRefetch
  };
};
