import { gql, useLazyQuery } from '@apollo/client';
import type {
  GetAssessmentByIdQuery,
  GetAssessmentByIdQueryVariables
} from '@/api/codegen/graphql';

const STATIC_OBJECT = {};

export const useGetAssessmentById = () => {
  const query = gql`
    query GetAssessmentById($id: ID!) {
      getAssessmentById(id: $id) {
        id
        assessmentTitle
        assessmentDescription
        assessmentImage
        assessmentUrl
        durationInMinutes
        dateUpdated
        vendorName
        vendorAssessmentId
        vendorId
      }
    }
  `;
  const [getAssessment, { loading, error, data }] = useLazyQuery<
    GetAssessmentByIdQuery,
    GetAssessmentByIdQueryVariables
  >(query);
  return {
    fetchAssessment: async input =>
      getAssessment({
        variables: input
      }),
    assessmentByIdLoading: loading,
    assessmentByIdError: error,
    assessmentById: (data?.getAssessmentById ||
      STATIC_OBJECT) as GetAssessmentByIdQuery['getAssessmentById']
  };
};
