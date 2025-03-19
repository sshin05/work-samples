import { gql, useMutation } from '@apollo/client';
import type {
  AssignLicenseMutation,
  AssignLicenseMutationVariables,
  UserInput
} from '@/api/codegen/graphql';

export const useAssignLicenseByMissionPartnerAndVendorAndUser = () => {
  const mutation = gql`
    mutation assignLicense($input: AssignLicenseInput!) {
      assignLicense(input: $input) {
        id
        status
        error
      }
    }
  `;
  const [assignLicense, { loading, error, data }] = useMutation<
    AssignLicenseMutation,
    AssignLicenseMutationVariables
  >(mutation, { refetchQueries: ['FindLicenseStatusCounts'] });

  return {
    assignLicenseByMissionPartnerAndVendorAndUser: async (
      missionPartnerId: string,
      vendorId: string,
      user: UserInput
    ) =>
      assignLicense({
        variables: {
          input: {
            missionPartnerId,
            vendorId,
            user
          }
        }
      }),
    assignLicenseByMissionPartnerAndVendorAndUserLoading: loading,
    assignLicenseByMissionPartnerAndVendorAndUserError: error,
    assignLicenseByMissionPartnerAndVendorAndUserData: data
  };
};
