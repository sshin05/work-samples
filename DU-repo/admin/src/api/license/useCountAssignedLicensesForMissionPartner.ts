import { gql, useQuery } from '@apollo/client';
import type {
  CountAssignedLicensesForMissionPartnerQuery,
  CountAssignedLicensesForMissionPartnerQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY: never[] = [];

export const useCountAssignedLicensesForMissionPartner = (
  missionPartnerId: string
) => {
  const query = gql`
    query CountAssignedLicensesForMissionPartner($missionPartnerId: ID!) {
      countAssignedLicensesForMissionPartner(
        missionPartnerId: $missionPartnerId
      ) {
        vendorId
        count
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    CountAssignedLicensesForMissionPartnerQuery,
    CountAssignedLicensesForMissionPartnerQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    }
  });
  return {
    assignedLicensesCountLoading: loading,
    assignedLicensesCountError: error,
    assignedLicensesCount:
      data?.countAssignedLicensesForMissionPartner || STATIC_ARRAY,
    refetchAssignedLicensesCount: async (missionPartnerId: string) =>
      refetch({
        missionPartnerId
      })
  };
};
