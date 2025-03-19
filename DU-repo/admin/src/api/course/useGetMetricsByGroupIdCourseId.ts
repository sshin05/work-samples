import { gql, useLazyQuery } from '@apollo/client';
import type {
  GetMetricsByGroupIdCourseIdQuery,
  GetMetricsByGroupIdCourseIdQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

const STATIC_ARRAY = [];

export const useGetMetricsByGroupIdCourseId = () => {
  const query = gql`
    query getMetricsByGroupIdCourseId($groupId: String!, $courseId: String!) {
      getMetricsByGroupIdCourseId(groupId: $groupId, courseId: $courseId) {
        startedAt
        completedAt
        status
        user {
          firstName
          lastName
          email
        }
      }
    }
  `;
  const [refetch, { data, loading, error }] = useLazyQuery<
    GetMetricsByGroupIdCourseIdQuery,
    GetMetricsByGroupIdCourseIdQueryVariables
  >(query, {
    fetchPolicy: 'network-only'
  });
  return useMemo(
    () => ({
      metricsLoading: loading,
      metricsError: error,
      metrics: (data?.getMetricsByGroupIdCourseId ||
        STATIC_ARRAY) as GetMetricsByGroupIdCourseIdQuery['getMetricsByGroupIdCourseId'],
      fetchMetrics: refetch
    }),
    [loading, error, data, refetch]
  );
};
