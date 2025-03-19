import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import type {
  FindCoursesBySourceQuery,
  FindCoursesBySourceQueryVariables
} from '@/api/codegen/graphql';

export const useFindCoursesBySource = (source: string) => {
  const query = gql`
    query findCoursesBySource($source: String!) {
      findCoursesBySource(source: $source) {
        data {
          id
          courseTitle
          courseDescription
          vendorName
          vendorCourseId
        }
        total
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindCoursesBySourceQuery,
    FindCoursesBySourceQueryVariables
  >(query, {
    variables: {
      source
    },
    skip: !source,
    fetchPolicy: 'network-only'
  });
  return useMemo(
    () => ({
      coursesBySourceLoading: loading,
      coursesBySourceError: error,
      coursesBySource: data?.findCoursesBySource?.data,
      total: data?.findCoursesBySource?.total || 0
    }),
    [loading, error, data]
  );
};
