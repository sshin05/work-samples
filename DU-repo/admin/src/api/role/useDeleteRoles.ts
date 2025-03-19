import { gql, useMutation } from '@apollo/client';
import type {
  DeleteRolesMutation,
  DeleteRolesMutationVariables,
  RoleName
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useDeleteRoles = () => {
  const mutation = gql`
    mutation DeleteRoles(
      $userIds: [ID!]
      $missionPartnerId: ID!
      $name: RoleName!
    ) {
      deleteRoles(
        userIds: $userIds
        missionPartnerId: $missionPartnerId
        name: $name
      )
    }
  `;
  const [deleteRoles, { loading, error, data }] = useMutation<
    DeleteRolesMutation,
    DeleteRolesMutationVariables
  >(mutation);
  return useMemo(
    () => ({
      deleteRoles: async (
        userIds: string,
        missionPartnerId: string,
        name: RoleName
      ) => {
        deleteRoles({
          variables: {
            userIds,
            missionPartnerId,
            name
          }
        });
      },
      deleteRolesLoading: loading,
      deleteRolesError: error,
      deleteRolesData: data?.deleteRoles
    }),
    [loading, error, data, deleteRoles]
  );
};
