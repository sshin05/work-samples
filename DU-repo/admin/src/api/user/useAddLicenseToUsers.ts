import { gql, useMutation } from '@apollo/client';
import type {
  AddLicenseToUsersMutation,
  AddLicenseToUsersMutationVariables,
  Scalars
} from '@/api/codegen/graphql';

export const useAddLicenseToUsers = () => {
  const mutation = gql`
    mutation AddLicenseToUsers(
      $file: Upload!
      $missionPartnerId: ID!
      $vendorId: ID!
    ) {
      addLicenseToUsers(
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
  const [addLicenseToUsers, { loading, error, data }] = useMutation<
    AddLicenseToUsersMutation,
    AddLicenseToUsersMutationVariables
  >(mutation, { refetchQueries: ['FindLicenseStatusCounts'] });

  return {
    addLicenseToUsers: async (
      file: Scalars['Upload'],
      missionPartnerId: string,
      vendorId: string
    ) =>
      addLicenseToUsers({
        variables: {
          file,
          missionPartnerId,
          vendorId
        }
      }),
    addLicenseToUsersLoading: loading,
    addLicenseToUsersError: error,
    addLicenseToUsersData: data?.addLicenseToUsers || null
  };
};
