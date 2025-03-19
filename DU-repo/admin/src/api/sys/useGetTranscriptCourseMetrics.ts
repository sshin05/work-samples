import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import type {
  GetTranscriptCourseMetricsExtraQuery,
  GetTranscriptCourseMetricsExtraQueryVariables
} from '../codegen/graphql';

export const useGetTranscriptCourseMetrics = (
  branch: string,
  trainingGroup?: string,
  missionPartnerId?: string,
  fieldCommand?: string,
  spaceDelta?: string,
  squadron?: string,
  organization?: string
) => {
  const query = gql`
    query getTranscriptCourseMetricsExtra(
      $branch: String!
      $trainingGroup: String
      $missionPartnerId: String
      $fieldCommand: String
      $spaceDelta: String
      $squadron: String
      $organization: String
    ) {
      getTranscriptCourseMetrics(
        branch: $branch
        trainingGroup: $trainingGroup
        missionPartnerId: $missionPartnerId
        fieldCommand: $fieldCommand
        spaceDelta: $spaceDelta
        squadron: $squadron
        organization: $organization
      ) {
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
    GetTranscriptCourseMetricsExtraQuery,
    GetTranscriptCourseMetricsExtraQueryVariables
  >(query, {
    variables: {
      branch,
      trainingGroup,
      missionPartnerId,
      fieldCommand,
      spaceDelta,
      squadron,
      organization
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
