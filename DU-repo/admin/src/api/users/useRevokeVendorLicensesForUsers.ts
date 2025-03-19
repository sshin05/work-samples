import { gql, useMutation } from '@apollo/client';
import type {
  RevokeVendorLicensesForUsersMutation,
  RevokeVendorLicensesForUsersMutationVariables
} from '@/api/codegen/graphql';

export const useRevokeVendorLicensesForUsers = () => {
  const mutation = gql`
    mutation revokeVendorLicensesForUsers(
      $file: Upload!
      $missionPartnerId: ID!
      $vendorId: ID!
    ) {
      revokeVendorLicensesForUsers(
        file: $file
        missionPartnerId: $missionPartnerId
        vendorId: $vendorId
      ) {
        id
        status
        error
      }
    }
  `;
  const [revokeVendorLicensesForUsers, { loading, error, data }] = useMutation<
    RevokeVendorLicensesForUsersMutation,
    RevokeVendorLicensesForUsersMutationVariables
  >(mutation);
  return {
    revokeVendorLicensesForUsers: async (
      file: RevokeVendorLicensesForUsersMutationVariables['file'],
      missionPartnerId: RevokeVendorLicensesForUsersMutationVariables['missionPartnerId'],
      vendorId: RevokeVendorLicensesForUsersMutationVariables['vendorId']
    ) =>
      revokeVendorLicensesForUsers({
        variables: {
          file,
          missionPartnerId,
          vendorId
        }
      }),
    revokeVendorLicensesForUsersLoading: loading,
    revokeVendorLicensesForUsersError: error,
    revokeVendorLicensesForUsersData: data?.revokeVendorLicensesForUsers || null
  };
};
