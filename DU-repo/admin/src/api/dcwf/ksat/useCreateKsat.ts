import { gql, useMutation } from '@apollo/client';
import type {
  CreateKsatMutation,
  CreateKsatMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useCreateKsat = () => {
  const mutation = gql`
    mutation CreateKsat($input: CreateKsatInput!) {
      createKsat(input: $input) {
        code
        domain {
          id
          name
          shortDescription
          description
        }
        id
        ksatType
      }
    }
  `;

  const [createKsat, { loading, error, data }] = useMutation<
    CreateKsatMutation,
    CreateKsatMutationVariables
  >(mutation, {
    refetchQueries: ['FindKsats']
  });

  return useMemo(
    () => ({
      createKsat: (input: CreateKsatMutationVariables['input']) =>
        createKsat({
          variables: {
            input
          }
        }),
      createKsatLoading: loading,
      createKsatError: error,
      createKsatData: data
    }),
    [loading, error, data, createKsat]
  );
};
