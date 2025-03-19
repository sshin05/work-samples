import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import type {
  UpdateCustomTrainingEnabledInput,
  UpdateCustomTrainingEnabledMutation,
  UpdateCustomTrainingEnabledMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateCustomTrainingEnabled = () => {
  const mutation = gql`
    mutation UpdateCustomTrainingEnabled(
      $input: UpdateCustomTrainingEnabledInput!
    ) {
      updateCustomTrainingEnabled(input: $input) {
        id
        name
        customTrainingEnabled
      }
    }
  `;
  const [_updateCustomTrainingEnabled, { loading, error }] = useMutation<
    UpdateCustomTrainingEnabledMutation,
    UpdateCustomTrainingEnabledMutationVariables
  >(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });

  const updateCustomTrainingEnabled = useCallback(
    async (input: UpdateCustomTrainingEnabledInput) =>
      await _updateCustomTrainingEnabled({
        variables: {
          input
        }
      }),
    [_updateCustomTrainingEnabled]
  );

  return {
    updateCustomTrainingEnabledLoading: loading,
    updateCustomTrainingEnabledError: error,
    updateCustomTrainingEnabled
  };
};
