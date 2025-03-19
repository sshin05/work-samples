import { gql, useMutation } from '@apollo/client';
import type {
  ToggleAllowContractorAccessMutation,
  ToggleAllowContractorAccessMutationVariables
} from '@/api/codegen/graphql';
import { useCallback } from 'react';

export const useToggleAllowContractorAccess = () => {
  const mutation = gql`
    mutation ToggleAllowContractorAccess($userId: ID!, $allow: Boolean) {
      toggleAllowContractorAccess(userId: $userId, allow: $allow) {
        id
        canAccessFullDu
      }
    }
  `;
  const [_toggleAllowContractorAccess, { loading, error }] = useMutation<
    ToggleAllowContractorAccessMutation,
    ToggleAllowContractorAccessMutationVariables
  >(mutation, {
    refetchQueries: ['findUserById'] // Query name
  });

  // useCallback wrapper for toggleAllowContractorAccess so I can pass into dependency array;
  const toggleAllowContractorAccess = useCallback(
    async (userId: string, allow?: boolean) => {
      return _toggleAllowContractorAccess({
        variables: {
          userId,
          allow
        }
      });
    },
    [_toggleAllowContractorAccess]
  );

  return {
    toggleAllowContractorAccess,
    toggleAllowContractorAccessLoading: loading,
    toggleAllowContractorAccessError: error
  };
};
