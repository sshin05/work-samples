import { gql, useMutation } from '@apollo/client';
import type {
  UpdateKsatMutation,
  UpdateKsatMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useUpdateKsat = () => {
  const mutation = gql`
    mutation UpdateKsat($updateKsatId: ID!, $input: UpdateKsatInput!) {
      updateKsat(id: $updateKsatId, input: $input) {
        id
        code
        ksatType
        description
        domain {
          id
          name
          shortDescription
          description
        }
      }
    }
  `;

  const [updateKsat, { loading, error, data }] = useMutation<
    UpdateKsatMutation,
    UpdateKsatMutationVariables
  >(mutation, {
    refetchQueries: ['FindKsats', 'GetKsat']
  });

  return useMemo(
    () => ({
      updateKsat: (
        updateKsatId: UpdateKsatMutationVariables['updateKsatId'],
        input: UpdateKsatMutationVariables['input']
      ) =>
        updateKsat({
          variables: {
            updateKsatId,
            input
          }
        }),
      updateKsatLoading: loading,
      updateKsatError: error,
      updateKsatData: data
    }),
    [loading, error, data, updateKsat]
  );
};
