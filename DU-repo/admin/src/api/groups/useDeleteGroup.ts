import { gql, useMutation } from '@apollo/client';
import type {
  DeleteGroupMutation,
  DeleteGroupMutationVariables
} from '@/api/codegen/graphql';

export const useDeleteGroup = () => {
  const mutation = gql`
    mutation DeleteGroup($groupId: ID!) {
      deleteGroup(groupId: $groupId)
    }
  `;
  const [deleteGroup, { loading, error, data }] = useMutation<
    DeleteGroupMutation,
    DeleteGroupMutationVariables
  >(mutation, {
    refetchQueries: [
      'FindAllGroups' // Query name
    ]
  });
  return {
    deleteGroup: (deletedGroupId: string) =>
      deleteGroup({
        variables: {
          groupId: deletedGroupId
        }
      }),
    deleteGroupLoading: loading,
    deleteGroupError: error,
    deleteGroupData: data
  };
};
