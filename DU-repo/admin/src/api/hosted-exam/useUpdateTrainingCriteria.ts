import { gql, useMutation } from '@apollo/client';
import type {
  TrainingCriteriaInput,
  UpdateTrainingCriteriaMutation,
  UpdateTrainingCriteriaMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateTrainingCriteria = () => {
  const mutation = gql`
    mutation updateTrainingCriteria(
      $hostedExamId: ID!
      $trainingCriteriaInput: TrainingCriteriaInput!
    ) {
      updateTrainingCriteria(
        hostedExamId: $hostedExamId
        trainingCriteriaInput: $trainingCriteriaInput
      ) {
        id
        missionPartnerId
        trainingCriteria {
          id
          minScore
          maxScore
          ruleType
        }
      }
    }
  `;
  const [updateTrainingCriteria, { loading, error, data }] = useMutation<
    UpdateTrainingCriteriaMutation,
    UpdateTrainingCriteriaMutationVariables
  >(mutation);
  return {
    updateTrainingCriteria: (
      hostedExamId: string,
      trainingCriteriaInput: TrainingCriteriaInput
    ) =>
      updateTrainingCriteria({
        variables: {
          hostedExamId,
          trainingCriteriaInput
        }
      }),
    updateTrainingCriteriaLoading: loading,
    updateTrainingCriteriaError: error,
    updateTrainingCriteriaData: data
  };
};
