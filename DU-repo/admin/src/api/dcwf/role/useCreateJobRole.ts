import { gql, useMutation } from '@apollo/client';
import type {
  CreateJobRoleMutation,
  CreateJobRoleMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useCreateJobRole = () => {
  const mutation = gql`
    mutation CreateJobRole($input: CreateJobRoleInput!) {
      createJobRole(input: $input) {
        id
        roleId
        name
        description
      }
    }
  `;

  const [createJobRole, { loading, error, data }] = useMutation<
    CreateJobRoleMutation,
    CreateJobRoleMutationVariables
  >(mutation, {
    refetchQueries: ['FindJobRoles']
  });

  return useMemo(
    () => ({
      createJobRole: (input: CreateJobRoleMutationVariables['input']) =>
        createJobRole({
          variables: {
            input
          }
        }),
      createJobRoleLoading: loading,
      createJobRoleError: error,
      createJobRoleData: data
    }),
    [loading, error, data, createJobRole]
  );
};
