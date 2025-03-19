import { gql, useMutation } from '@apollo/client';
import type {
  AddCoursesToGroupMutation,
  AddCoursesToGroupMutationVariables
} from '@/api/codegen/graphql';

export const useAddCoursesToGroup = (
  groupId?: string,
  courseIds?: string[],
  missionPartnerId?: string
) => {
  const mutation = gql`
    mutation AddCoursesToGroup(
      $groupId: ID!
      $courseIds: [ID]!
      $missionPartnerId: ID!
    ) {
      addCoursesToGroup(
        groupId: $groupId
        courseIds: $courseIds
        missionPartnerId: $missionPartnerId
      )
    }
  `;
  const [addCoursesToGroup, { loading, error }] = useMutation<
    AddCoursesToGroupMutation,
    AddCoursesToGroupMutationVariables
  >(mutation, {
    variables: {
      groupId,
      courseIds,
      missionPartnerId
    }
  });
  return {
    addCoursesToGroup: (
      groupId: string,
      courseIds: string[],
      missionPartnerId: string
    ) =>
      addCoursesToGroup({
        variables: {
          groupId,
          courseIds,
          missionPartnerId
        }
      }),
    addCoursesToGroupLoading: loading,
    addCoursesToGroupError: error
  };
};
