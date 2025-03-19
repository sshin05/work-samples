import { gql, useQuery } from '@apollo/client';
import type {
  AggregateTranscriptItemsForTrainingPlanQuery,
  AggregateTranscriptItemsForTrainingPlanQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

const STATIC_ARRAY = [];

export const useAggregateTranscriptItemsForTrainingPlan = (options: {
  missionPartnerId?: string;
  groupId?: string;
  planType: string;
  planSourceId: string;
  planVersion: string;
}) => {
  const query = gql`
    query AggregateTranscriptItemsForTrainingPlan(
      $missionPartnerId: String
      $groupId: String
      $planType: String!
      $planSourceId: String!
      $planVersion: String
    ) {
      aggregateTranscriptItemsForTrainingPlan(
        missionPartnerId: $missionPartnerId
        groupId: $groupId
        planType: $planType
        planSourceId: $planSourceId
        planVersion: $planVersion
      ) {
        itemId
        itemTitle
        vendorName
        total
        started
        stopped
        pendingReview
        markedCompleted
        completed
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    AggregateTranscriptItemsForTrainingPlanQuery,
    AggregateTranscriptItemsForTrainingPlanQueryVariables
  >(query, {
    variables: {
      ...options
    },
    fetchPolicy: 'cache-and-network'
  });
  return useMemo(
    () => ({
      transcriptItemsLoading: loading,
      transcriptItemsError: error,
      transcriptItems: (data?.aggregateTranscriptItemsForTrainingPlan ||
        STATIC_ARRAY) as AggregateTranscriptItemsForTrainingPlanQuery['aggregateTranscriptItemsForTrainingPlan'],
      refetchTranscriptCourses: refetch
    }),
    [loading, error, data, refetch]
  );
};
