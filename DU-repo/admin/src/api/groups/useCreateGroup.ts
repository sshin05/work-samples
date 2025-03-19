import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import type {
  CreateGroupMutation,
  CreateGroupMutationVariables
} from '@/api/codegen/graphql';

export const useCreateGroup = () => {
  const mutation = gql`
    mutation CreateGroup($name: String!, $missionPartnerId: String) {
      createGroup(name: $name, missionPartnerId: $missionPartnerId) {
        id
        name
        groupMemberCount
      }
    }
  `;
  const [_createGroup, { loading, error, data }] = useMutation<
    CreateGroupMutation,
    CreateGroupMutationVariables
  >(mutation);

  const createGroup = useCallback(
    (name: string, missionPartnerId?: string) =>
      _createGroup({
        variables: {
          name,
          missionPartnerId
        }
      }),
    [_createGroup]
  );

  return {
    createGroup,
    createGroupLoading: loading,
    createGroupError: error,
    createGroupData: data
  };
};
