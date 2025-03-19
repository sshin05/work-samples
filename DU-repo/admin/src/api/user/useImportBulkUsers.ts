import { gql, useMutation } from '@apollo/client';
import type {
  ImportBulkUsersMutation,
  ImportBulkUsersMutationVariables
} from '@/api/codegen/graphql';

export const useImportBulkUsers = () => {
  const mutation = gql`
    mutation ImportBulkUsers(
      $bulkUploadFile: Upload!
      $missionPartnerId: ID
      $groupId: ID
    ) {
      importBulkUsers(
        file: $bulkUploadFile
        missionPartnerId: $missionPartnerId
        groupId: $groupId
      ) {
        id
        status
        error
      }
    }
  `;
  const [importBulkUsers, { loading, error, data }] = useMutation<
    ImportBulkUsersMutation,
    ImportBulkUsersMutationVariables
  >(mutation);
  return {
    importBulkUsers,
    importBulkUsersLoading: loading,
    importBulkUsersError: error,
    importBulkUsersData: data?.importBulkUsers || null
  };
};
