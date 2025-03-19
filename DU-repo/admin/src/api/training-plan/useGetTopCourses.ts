import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

// todo, update from gql:
type TempTopCoursesOptions = {
  missionPartnerId?: string;
  limit?: number;
};

export const useGetTopCourses = (options: TempTopCoursesOptions = {}) => {
  const query = gql`
    query GetTopCourses($missionPartnerId: String, $limit: SafeInt) {
      getTopCourses(missionPartnerId: $missionPartnerId, limit: $limit) {
        count
        id
        title
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    variables: {
      missionPartnerId: options.missionPartnerId,
      limit: options.limit || undefined
    },
    skip: !options.missionPartnerId,
    fetchPolicy: 'cache-and-network'
  });

  return useMemo(
    () => ({
      topCoursesMetricsLoading: loading,
      topCoursesMetricsError: error,
      topCoursesMetrics: data?.getTopCourses || null
    }),
    [loading, error, data]
  );
};
