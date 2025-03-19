import { gql, useMutation } from '@apollo/client';
import type {
  UpdateDomainMutation,
  UpdateDomainMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useUpdateDomain = () => {
  const mutation = gql`
    mutation UpdateDomain($updateDomainId: ID!, $input: UpdateDomainInput!) {
      updateDomain(id: $updateDomainId, input: $input) {
        id
        name
        shortDescription
        description
      }
    }
  `;

  const [updateDomain, { loading, error, data }] = useMutation<
    UpdateDomainMutation,
    UpdateDomainMutationVariables
  >(mutation, {
    refetchQueries: ['FindDomains', 'GetDomain']
  });

  return useMemo(
    () => ({
      updateDomain: (
        updateDomainId: UpdateDomainMutationVariables['updateDomainId'],
        input: UpdateDomainMutationVariables['input']
      ) =>
        updateDomain({
          variables: {
            updateDomainId,
            input
          }
        }),
      updateDomainLoading: loading,
      updateDomainError: error,
      updateDomainData: data
    }),
    [loading, error, data, updateDomain]
  );
};
