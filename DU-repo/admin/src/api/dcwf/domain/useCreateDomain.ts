import { gql, useMutation } from '@apollo/client';
import type {
  CreateDomainMutation,
  CreateDomainMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useCreateDomain = () => {
  const mutation = gql`
    mutation CreateDomain($input: CreateDomainInput!) {
      createDomain(input: $input) {
        id
        name
        shortDescription
        description
      }
    }
  `;

  const [createDomain, { loading, error, data }] = useMutation<
    CreateDomainMutation,
    CreateDomainMutationVariables
  >(mutation, {
    refetchQueries: ['FindDomains']
  });

  return useMemo(
    () => ({
      createDomain: (input: CreateDomainMutationVariables['input']) =>
        createDomain({
          variables: {
            input
          }
        }),
      createDomainLoading: loading,
      createDomainError: error,
      createDomainData: data
    }),
    [loading, error, data, createDomain]
  );
};
