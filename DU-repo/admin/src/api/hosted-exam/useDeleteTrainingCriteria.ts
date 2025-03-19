import { gql, useMutation } from '@apollo/client';
import type {
  DeleteTrainingCriteriaMutation,
  DeleteTrainingCriteriaMutationVariables
} from '@/api/codegen/graphql';

export const useDeleteTrainingCriteria = () => {
  const mutation = gql`
    mutation deleteTrainingCriteria(
      $hostedExamId: ID!
      $trainingCriteriaId: ID!
    ) {
      deleteTrainingCriteria(
        hostedExamId: $hostedExamId
        trainingCriteriaId: $trainingCriteriaId
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
  const [deleteTrainingCriteria, { loading, error, data }] = useMutation<
    DeleteTrainingCriteriaMutation,
    DeleteTrainingCriteriaMutationVariables
  >(mutation);
  return {
    deleteTrainingCriteria: (
      hostedExamId: string,
      trainingCriteriaId: string
    ) =>
      deleteTrainingCriteria({
        variables: {
          hostedExamId,
          trainingCriteriaId
        }
      }),
    deleteTrainingCriteriaLoading: loading,
    deleteTrainingCriteriaError: error,
    deleteTrainingCriteriaData: data
  };
};
