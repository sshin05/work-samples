import { gql, useMutation } from '@apollo/client';

export const useExportUsers = () => {
  const mutation = gql`
    mutation ExportUsers($branch: String) {
      exportUsers(branch: $branch)
    }
  `;

  const [exportUsers, { loading, error }] = useMutation(mutation);

  return {
    exportUsers,
    exportUsersLoading: loading,
    exportUsersError: error
  };
};
