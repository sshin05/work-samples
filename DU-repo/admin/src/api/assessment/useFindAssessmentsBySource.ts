import { gql, useQuery } from '@apollo/client';
import type {
  FindAssessmentsBySourceQuery,
  FindAssessmentsBySourceQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useFindAssessmentsBySource = source => {
  const query = gql`
    query FindAssessmentsBySource($source: String!) {
      findAssessmentsBySource(source: $source) {
        id
        assessmentTitle
        assessmentDescription
        assessmentImage
        dateUpdated
        vendorName
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindAssessmentsBySourceQuery,
    FindAssessmentsBySourceQueryVariables
  >(query, {
    variables: {
      source
    },
    skip: !source
  });
  return {
    assessmentsBySourceLoading: loading,
    assessmentsBySourceError: error,
    assessmentsBySource: data?.findAssessmentsBySource || STATIC_ARRAY
  };
};
