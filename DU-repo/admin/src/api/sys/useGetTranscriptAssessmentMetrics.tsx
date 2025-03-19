import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
// import type {
//   GetTranscriptAssessmentMetricsQuery,
//   GetTranscriptAssessmentMetricsQueryVariables
// } from '../codegen/graphql';

export const useGetTranscriptAssessmentMetrics = (since?: string) => {
  const query = gql`
    query GetTranscriptAssessmentMetrics($since: String) {
      getTranscriptAssessmentMetrics(since: $since) {
        started
        stopped
        pendingReview
        markedCompleted
        completed
        total
      }
    }
  `;

  const { loading, error, data } = useQuery(query, {
    variables: {
      since
    }
  });

  return useMemo(
    () => ({
      transcriptAssessmentMetricsLoading: loading,
      transcriptAssessmentMetricsError: error,
      transcriptAssessmentMetrics: data?.getTranscriptAssessmentMetrics
    }),
    [loading, error, data]
  );
};
