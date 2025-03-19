import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import type {
  GetTrainingPlanMetricsQuery,
  GetTrainingPlanMetricsQueryVariables
} from '@/api/codegen/graphql';

export const useGetTrainingPlanMetrics = () => {
  const query = gql`
    query getTrainingPlanMetricsAll {
      getTrainingPlanMetrics {
        totalPlans
        plansInProgress
        plansCompleted
        plansStopped
        plansAssigned
      }
    }
  `;

  const { loading, error, data } = useQuery<
    GetTrainingPlanMetricsQuery,
    GetTrainingPlanMetricsQueryVariables
  >(query, {
    fetchPolicy: 'cache-and-network'
  });

  return useMemo(
    () => ({
      trainingPlanMetricsLoading: loading,
      trainingPlanMetricsError: error,
      trainingPlanMetrics: data?.getTrainingPlanMetrics
    }),
    [loading, error, data]
  );
};

// todo -- implement on backend
