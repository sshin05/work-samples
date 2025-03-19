import { gql, useMutation } from '@apollo/client';
import type {
  AddItemsToTrainingCriteriaMutation,
  AddItemsToTrainingCriteriaMutationVariables,
  AssignedTrainingInput
} from '@/api/codegen/graphql';

export const useAddItemsToTrainingCriteria = () => {
  const mutation = gql`
    mutation addItemsToTrainingCriteria(
      $hostedExamId: ID!
      $trainingCriteriaId: ID!
      $assignedTrainingInput: [AssignedTrainingInput]!
    ) {
      addItemsToTrainingCriteria(
        hostedExamId: $hostedExamId
        trainingCriteriaId: $trainingCriteriaId
        assignedTrainingInput: $assignedTrainingInput
      ) {
        id
        missionPartnerId
        trainingCriteria {
          id
          maxScore
          minScore
          ruleType
          training {
            type
            courseId
            assessmentId
            planType
            planSourceId
            planVersion
            title
            requiredLicenses {
              vendorId
              vendorName
            }
            vendors
          }
        }
      }
    }
  `;
  const [addItemsToTrainingCriteria, { loading, error, data }] = useMutation<
    AddItemsToTrainingCriteriaMutation,
    AddItemsToTrainingCriteriaMutationVariables
  >(mutation);
  return {
    addItemsToTrainingCriteria: (
      hostedExamId: string,
      trainingCriteriaId: string,
      assignedTrainingInput: AssignedTrainingInput[]
    ) =>
      addItemsToTrainingCriteria({
        variables: {
          hostedExamId,
          trainingCriteriaId,
          assignedTrainingInput
        }
      }),
    addItemsToTrainingCriteriaLoading: loading,
    addItemsToTrainingCriteriaError: error,
    addItemsToTrainingCriteriaData: data
  };
};
