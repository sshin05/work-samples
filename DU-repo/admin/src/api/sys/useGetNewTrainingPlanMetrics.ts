import { gql, useQuery } from '@apollo/client';
import type {
  GetTrainingPlanMetricsQuery,
  GetTrainingPlanMetricsQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useGetNewTrainingPlanMetrics = (
  branch: string,
  dayRange: number
) => {
  const query = gql`
    query GetTrainingPlanMetrics($dayRange: SafeInt) {
      getTrainingPlanMetrics(dayRange: $dayRange) {
        totalPlans
        plansInProgress
        plansCompleted
      }
    }
  `;
  const { loading, error, data } = useQuery<
    GetTrainingPlanMetricsQuery,
    GetTrainingPlanMetricsQueryVariables
  >(query, {
    variables: {
      dayRange
    },
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
