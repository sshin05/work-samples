import { gql, useQuery } from '@apollo/client';
import type {
  FindLicensesByUserIdQuery,
  FindLicensesByUserIdQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY: never[] = [];

export const useFindLearnerLicenses = (
  userId: string,
  missionPartnerId: string
) => {
  const query = gql`
    query FindLicensesByUserId($userId: ID!, $missionPartnerId: ID!) {
      licenses: findLicensesByUserId(userId: $userId) {
        vendorId
        vendorName
        userId
        missionPartnerId
        missionPartnerName
        assignedAt
      }
      licenseStatusCounts: findLicenseStatusCounts(
        missionPartnerId: $missionPartnerId
      ) {
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
    FindLicensesByUserIdQuery,
    FindLicensesByUserIdQueryVariables
  >(query, {
    variables: {
      userId,
      missionPartnerId
    }
  });

  const provisionedLicenses =
    data?.licenses.filter(license =>
      data.licenseStatusCounts.some(
        status => status.vendorId === license.vendorId
      )
    ) || [];

  const useRefetch = async (userId: string, missionPartnerId: string) =>
    refetch({
      userId,
      missionPartnerId
    });

  return {
    learnerLicensesLoading: loading,
    learnerLicensesError: error,
    learnerLicenses: provisionedLicenses || STATIC_ARRAY,
    refetchLearnerLicenses: useRefetch
  };
};
