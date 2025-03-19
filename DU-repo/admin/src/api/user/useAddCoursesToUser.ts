import { gql, useMutation } from '@apollo/client';
import type {
  AddCoursesToUserMutation,
  AddCoursesToUserMutationVariables,
  InputMaybe
} from '@/api/codegen/graphql';

export const useAddCoursesToUser = () => {
  const mutation = gql`
    mutation AddCoursesToUser(
      $userId: ID!
      $courseIds: [ID]!
      $missionPartnerId: ID!
    ) {
      addCoursesToUser(
        userId: $userId
        courseIds: $courseIds
        missionPartnerId: $missionPartnerId
      )
    }
  `;
  const [addCoursesToUser, { loading, error }] = useMutation<
    AddCoursesToUserMutation,
    AddCoursesToUserMutationVariables
  >(mutation);
  return {
    addCoursesToUser: (
      userId: string,
      courseIds: Array<string> | InputMaybe<string>,
      missionPartnerId: string
    ) =>
      addCoursesToUser({
        variables: {
          userId,
          courseIds,
          missionPartnerId
        }
      }),
    addCoursesToUserLoading: loading,
    addCoursesToUserError: error
  };
};
