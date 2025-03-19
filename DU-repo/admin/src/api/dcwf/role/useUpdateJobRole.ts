import { gql, useMutation } from '@apollo/client';
import type {
  UpdateJobRoleMutation,
  UpdateJobRoleMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useUpdateJobRole = () => {
  const mutation = gql`
    mutation UpdateJobRole($updateJobRoleId: ID!, $input: UpdateJobRoleInput!) {
      updateJobRole(id: $updateJobRoleId, input: $input) {
        id
        roleId
        name
        description
      }
    }
  `;

  const [updateJobRole, { loading, error, data }] = useMutation<
    UpdateJobRoleMutation,
    UpdateJobRoleMutationVariables
  >(mutation, {
    refetchQueries: ['FindJobRoles', 'GetJobRole']
  });

  return useMemo(
    () => ({
      updateJobRole: (
        updateJobRoleId: UpdateJobRoleMutationVariables['updateJobRoleId'],
        input: UpdateJobRoleMutationVariables['input']
      ) =>
        updateJobRole({
          variables: {
            updateJobRoleId,
            input
          }
        }),
      updateJobRoleLoading: loading,
      updateJobRoleError: error,
      updateJobRoleData: data
    }),
    [loading, error, data, updateJobRole]
  );
};
