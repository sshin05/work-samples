import { gql, useMutation } from '@apollo/client';
import type {
  CreateRoleInput,
  CreateRoleMutation,
  CreateRoleMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useCreateRole = () => {
  const mutation = gql`
    mutation CreateRole($input: CreateRoleInput!) {
      createRole(input: $input) {
        userId
        missionPartnerId
        name
      }
    }
  `;
  const [createRole, { loading, error, data }] = useMutation<
    CreateRoleMutation,
    CreateRoleMutationVariables
  >(mutation);
  return useMemo(
    () => ({
      createRoleLoading: loading,
      createRoleError: error,
      createRoleData: data?.createRole,
      createRole: (input: CreateRoleInput) =>
        createRole({
          variables: {
            input
          }
        })
    }),
    [loading, error, data, createRole]
  );
};
