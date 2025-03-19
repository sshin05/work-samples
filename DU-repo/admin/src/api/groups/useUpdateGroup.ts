import { gql, useMutation } from '@apollo/client';
import type {
  UpdateGroupMutation,
  UpdateGroupMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

const STATIC_ARRAY: never[] = [];

export const useUpdateGroup = () => {
  const mutation = gql`
    mutation UpdateGroup(
      $groupId: ID!
      $name: String!
      $missionPartnerId: String
    ) {
      updateGroup(
        groupId: $groupId
        name: $name
        missionPartnerId: $missionPartnerId
      ) {
        id
        name
        groupMemberCount
        missionPartnerId
      }
    }
  `;
  const [updateGroup, { loading, error, data }] = useMutation<
    UpdateGroupMutation,
    UpdateGroupMutationVariables
  >(mutation);
  const updateGroupCached = useMemo(() => {
    return (groupId: string, name: string, missionPartnerId?: string) =>
      updateGroup({
        variables: {
          groupId,
          name,
          missionPartnerId
        }
      });
  }, [updateGroup]);
  return {
    updateGroup: updateGroupCached,
    updateGroupLoading: loading,
    updateGroupError: error,
    updateGroupData: data || STATIC_ARRAY
  };
};
