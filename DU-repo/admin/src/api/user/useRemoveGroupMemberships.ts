import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import type {
  RemoveGroupMembershipsMutation,
  RemoveGroupMembershipsMutationVariables
} from '@/api/codegen/graphql';

export const useRemoveGroupMemberships = () => {
  const mutation = gql`
    mutation removeGroupMemberships(
      $groupId: ID!
      $userIds: [ID!]!
      $missionPartnerId: ID!
    ) {
      removeGroupMemberships(
        groupId: $groupId
        userIds: $userIds
        missionPartnerId: $missionPartnerId
      )
    }
  `;
  const [_removeGroupMemberships, { loading, error }] = useMutation<
    RemoveGroupMembershipsMutation,
    RemoveGroupMembershipsMutationVariables
  >(mutation);

  const removeGroupMemberships = useCallback(
    (groupId: string, userIds: string | string[], missionPartnerId: string) =>
      _removeGroupMemberships({
        variables: {
          groupId,
          userIds,
          missionPartnerId
        }
      }),
    [_removeGroupMemberships]
  );

  return {
    removeGroupMemberships,
    removeGroupMembershipsLoading: loading,
    removeGroupMembershipsError: error
  };
};
