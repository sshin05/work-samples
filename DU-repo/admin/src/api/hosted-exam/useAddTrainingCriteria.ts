import { gql, useMutation } from '@apollo/client';
import type {
  AddTrainingCriteriaInput,
  AddTrainingCriteriaMutation,
  AddTrainingCriteriaMutationVariables
} from '@/api/codegen/graphql';

// Training Criteria
export const useAddTrainingCriteria = () => {
  const mutation = gql`
    mutation addTrainingCriteria(
      $hostedExamId: ID!
      $trainingCriteriaInput: AddTrainingCriteriaInput!
    ) {
      addTrainingCriteria(
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
  const [addTrainingCriteria, { loading, error, data }] = useMutation<
    AddTrainingCriteriaMutation,
    AddTrainingCriteriaMutationVariables
  >(mutation);
  return {
    addTrainingCriteria: (
      hostedExamId: string,
      trainingCriteriaInput: AddTrainingCriteriaInput
    ) =>
      addTrainingCriteria({
        variables: {
          hostedExamId,
          trainingCriteriaInput
        }
      }),
    addTrainingCriteriaLoading: loading,
    addTrainingCriteriaError: error,
    addTrainingCriteriaData: data
  };
};
