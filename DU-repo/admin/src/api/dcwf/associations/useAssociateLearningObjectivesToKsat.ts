import { gql, useMutation } from '@apollo/client';
import type {
  AssociateLearningObjectivesToKsatMutation,
  AssociateLearningObjectivesToKsatMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useAssociateLearningObjectivesToKsat = () => {
  const mutation = gql`
    mutation AssociateLearningObjectivesToKsat(
      $ksatId: ID!
      $learningObjectiveIds: [ID!]!
    ) {
      associateLearningObjectivesToKsat(
        ksatId: $ksatId
        learningObjectiveIds: $learningObjectiveIds
      )
    }
  `;

  const [associateLearningObjectivesToKsat, { loading, error, data }] =
    useMutation<
      AssociateLearningObjectivesToKsatMutation,
      AssociateLearningObjectivesToKsatMutationVariables
    >(mutation, {
      refetchQueries: ['FindKsats', 'GetKsat']
    });

  return useMemo(
    () => ({
      associateLearningObjectivesToKsat: (
        ksatId: AssociateLearningObjectivesToKsatMutationVariables['ksatId'],
        learningObjectiveIds: AssociateLearningObjectivesToKsatMutationVariables['learningObjectiveIds']
      ) =>
        associateLearningObjectivesToKsat({
          variables: {
            ksatId,
            learningObjectiveIds
          }
        }),
      associateLearningObjectivesToKsatLoading: loading,
      associateLearningObjectivesToKsatError: error,
      associateLearningObjectivesToKsatData: data
    }),
    [loading, error, data, associateLearningObjectivesToKsat]
  );
};
