import { gql, useMutation } from '@apollo/client';

export const useImportSingleUser = () => {
  const mutation = gql`
    mutation ImportSingleUser(
      $firstName: String!
      $lastName: String!
      $email: String!
      $missionPartnerId: ID
      $groupId: ID
    ) {
      importSingleUser(
        firstName: $firstName
        lastName: $lastName
        email: $email
        missionPartnerId: $missionPartnerId
        groupId: $groupId
      ) {
        id
      }
    }
  `;
  const [importSingleUser, { loading, error, data }] = useMutation(mutation);
  return {
    importSingleUser,
    importSingleUserLoading: loading,
    importSingleUserError: error,
    importSingleUserData: data?.importSingleUser || null
  };
};
