import { gql, useMutation } from '@apollo/client';
import {
  GetAssessmentByIdDocument,
  type UpdateAssessmentMutation,
  type UpdateAssessmentMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateAssessment = () => {
  const mutation = gql`
    mutation UpdateAssessment($assessment: AssessmentInput!) {
      updateAssessment(assessment: $assessment) {
        id
        vendorId
        vendorAssessmentId
        vendorName
        assessmentTitle
        assessmentDescription
        assessmentUrl
        assessmentImage
        source
      }
    }
  `;
  const [updateAssessment, { loading, error, data }] = useMutation<
    UpdateAssessmentMutation,
    UpdateAssessmentMutationVariables
  >(mutation, {
    refetchQueries: ({ data }) => {
      const { updateAssessment } = data || {};
      return [
        {
          query: GetAssessmentByIdDocument,
          // Using the code-generated document for refetch
          variables: {
            id: updateAssessment?.id
          }
        }
      ];
    }
  });
  return {
    updateAssessment: async assessment =>
      updateAssessment({
        variables: {
          assessment
        }
      }),
    updateAssessmentLoading: loading,
    updateAssessmentError: error,
    updateAssessmentData: data
  };
};
