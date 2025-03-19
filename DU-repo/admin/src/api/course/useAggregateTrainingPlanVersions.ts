import { gql, useQuery } from '@apollo/client';
import type {
  AggregateTrainingPlanVersionsQuery,
  AggregateTrainingPlanVersionsQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

const STATIC_OBJECT: unknown = {};

export const useAggregateTrainingPlanVersions = (options: {
  planType: string;
  planSourceId: string;
}) => {
  const query = gql`
    query AggregateTrainingPlanVersions(
      $planType: String!
      $planSourceId: String!
    ) {
      aggregateTrainingPlanVersions(
        planType: $planType
        planSourceId: $planSourceId
      ) {
        versions
        versionEnabled
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    AggregateTrainingPlanVersionsQuery,
    AggregateTrainingPlanVersionsQueryVariables
  >(query, {
    variables: {
      ...options
    },
    fetchPolicy: 'cache-and-network'
  });
  return useMemo(
    () => ({
      trainingPlanVersionsLoading: loading,
      trainingPlanVersionsError: error,
      trainingPlanVersions: (data?.aggregateTrainingPlanVersions ||
        STATIC_OBJECT) as AggregateTrainingPlanVersionsQuery['aggregateTrainingPlanVersions'],
      refetchTrainingPlanVersions: refetch
    }),
    [loading, error, data, refetch]
  );
};
