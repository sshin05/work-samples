import { gql, useMutation } from '@apollo/client';
import type {
  UpdateLearningObjectiveMutation,
  UpdateLearningObjectiveMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useUpdateLearningObjective = () => {
  const mutation = gql`
    mutation UpdateLearningObjective(
      $updateLearningObjectiveId: ID!
      $input: UpdateLearningObjectiveInput!
    ) {
      updateLearningObjective(id: $updateLearningObjectiveId, input: $input) {
        id
        description
      }
    }
  `;

  const [updateLearningObjective, { loading, error, data }] = useMutation<
    UpdateLearningObjectiveMutation,
    UpdateLearningObjectiveMutationVariables
  >(mutation, {
    refetchQueries: ['FindLearningObjectives', 'GetLearningObjective']
  });

  return useMemo(
    () => ({
      updateLearningObjective: (
        updateLearningObjectiveId: UpdateLearningObjectiveMutationVariables['updateLearningObjectiveId'],
        input: UpdateLearningObjectiveMutationVariables['input']
      ) =>
        updateLearningObjective({
          variables: {
            updateLearningObjectiveId,
            input
          }
        }),
      updateLearningObjectiveLoading: loading,
      updateLearningObjectiveError: error,
      updateLearningObjectiveData: data
    }),
    [loading, error, data, updateLearningObjective]
  );
};
