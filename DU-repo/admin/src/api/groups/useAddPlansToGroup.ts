import { gql, useMutation } from '@apollo/client';
import type {
  AddPlansInput,
  AddTrainingPlansToGroupMutation,
  AddTrainingPlansToGroupMutationVariables
} from '@/api/codegen/graphql';

export const useAddPlansToGroup = () => {
  const mutation = gql`
    mutation AddTrainingPlansToGroup(
      $groupId: ID!
      $plans: [AddPlansInput!]!
      $missionPartnerId: ID!
    ) {
      addTrainingPlansToGroup(
        groupId: $groupId
        plans: $plans
        missionPartnerId: $missionPartnerId
      )
    }
  `;
  const [addPlansToGroup, { loading, error, data }] = useMutation<
    AddTrainingPlansToGroupMutation,
    AddTrainingPlansToGroupMutationVariables
  >(mutation);
  return {
    addPlansToGroup: (
      groupId: string,
      plans: Array<AddPlansInput> | AddPlansInput,
      missionPartnerId: string
    ) =>
      addPlansToGroup({
        variables: {
          groupId,
          plans,
          missionPartnerId
        }
      }),
    addPlansToGroupLoading: loading,
    addPlansToGroupError: error,
    addPlansToGroupData: data
  };
};
