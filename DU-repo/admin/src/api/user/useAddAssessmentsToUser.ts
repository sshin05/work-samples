import { gql, useMutation } from '@apollo/client';
import type {
  AddAssessmentsToUserMutation,
  AddAssessmentsToUserMutationVariables,
  InputMaybe
} from '@/api/codegen/graphql';

export const useAddAssessmentsToUser = () => {
  const mutation = gql`
    mutation AddAssessmentsToUser(
      $userId: ID!
      $assessmentIds: [ID]!
      $missionPartnerId: ID!
    ) {
      addAssessmentsToUser(
        userId: $userId
        assessmentIds: $assessmentIds
        missionPartnerId: $missionPartnerId
      )
    }
  `;
  const [addAssessmentsToUser, { loading, error }] = useMutation<
    AddAssessmentsToUserMutation,
    AddAssessmentsToUserMutationVariables
  >(mutation);
  return {
    addAssessmentsToUser: (
      userId: string,
      assessmentIds: Array<string> | InputMaybe<string>,
      missionPartnerId: string
    ) =>
      addAssessmentsToUser({
        variables: {
          userId,
          assessmentIds,
          missionPartnerId
        }
      }),
    addAssessmentsToUserLoading: loading,
    addAssessmentsToUserError: error
  };
};
