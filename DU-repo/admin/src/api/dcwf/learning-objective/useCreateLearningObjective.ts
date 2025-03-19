import { gql, useMutation } from '@apollo/client';
import type {
  CreateLearningObjectiveMutation,
  CreateLearningObjectiveMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useCreateLearningObjective = () => {
  const mutation = gql`
    mutation CreateLearningObjective($input: CreateLearningObjectiveInput!) {
      createLearningObjective(input: $input) {
        id
        description
      }
    }
  `;

  const [createLearningObjective, { loading, error, data }] = useMutation<
    CreateLearningObjectiveMutation,
    CreateLearningObjectiveMutationVariables
  >(mutation, {
    refetchQueries: ['FindLearningObjectives']
  });

  return useMemo(
    () => ({
      createLearningObjective: (
        input: CreateLearningObjectiveMutationVariables['input']
      ) =>
        createLearningObjective({
          variables: {
            input
          }
        }),
      createLearningObjectiveLoading: loading,
      createLearningObjectiveError: error,
      createLearningObjectiveData: data
    }),
    [loading, error, data, createLearningObjective]
  );
};
