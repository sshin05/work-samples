import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

export const useGetVendorsForAggregateTranscriptCourses = (options: {
  missionPartnerId?: string;
}) => {
  const query = gql`
    query GetVendorsForAggregateTranscriptCourses($missionPartnerId: String) {
      getVendorsForAggregateTranscriptCourses(
        missionPartnerId: $missionPartnerId
      ) {
        vendorName
        vendorId
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    variables: {
      ...options
    },
    fetchPolicy: 'cache-and-network'
  });
  return useMemo(
    () => ({
      getVendorsForAggregateTranscriptCoursesLoading: loading,
      getVendorsForAggregateTranscriptCoursesError: error,
      getVendorsForAggregateTranscriptCourses:
        data?.getVendorsForAggregateTranscriptCourses
    }),
    [loading, error, data]
  );
};
