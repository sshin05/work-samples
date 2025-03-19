import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import type {
  GetTranscriptCourseMetricsQuery,
  GetTranscriptCourseMetricsQueryVariables
} from '@/api/codegen/graphql';

export const useGetNewTranscriptCourseMetrics = (
  branch: string,
  dayRange: number
) => {
  const query = gql`
    query getTranscriptCourseMetrics($branch: String!, $dayRange: SafeInt) {
      getTranscriptCourseMetrics(branch: $branch, dayRange: $dayRange) {
        totalCourses
        coursesInProgress
        coursesCompleted
        coursesStopped
        coursesPendingReview
        totalHoursCompleted
      }
    }
  `;

  const { loading, error, data } = useQuery<
    GetTranscriptCourseMetricsQuery,
    GetTranscriptCourseMetricsQueryVariables
  >(query, {
    variables: {
      branch,
      dayRange
    },
    fetchPolicy: 'cache-and-network'
  });

  return useMemo(
    () => ({
      transcriptCourseMetricsLoading: loading,
      transcriptCourseMetricsError: error,
      transcriptCourseMetrics: data?.getTranscriptCourseMetrics
    }),
    [loading, error, data]
  );
};

// todo -- implement on backend
