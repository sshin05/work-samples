import { gql, useMutation } from '@apollo/client';

export const useCreateManualAssessment = () => {
  const mutation = gql`
    mutation CreateManualAssessment($assessment: AssessmentInput!) {
      createManualAssessment(assessment: $assessment) {
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
  const [createManualAssessment, { loading, error, data }] =
    useMutation(mutation);
  return {
    createManualAssessment: async assessment =>
      createManualAssessment({
        variables: {
          assessment
        }
      }),
    createManualAssessmentLoading: loading,
    createManualAssessmentError: error,
    createManualAssessmentData: data
  };
};
