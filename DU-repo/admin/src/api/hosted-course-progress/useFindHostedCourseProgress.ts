import { gql, useQuery } from '@apollo/client';
import type {
  FindHostedCourseProgressByIdQuery,
  FindHostedCourseProgressByIdQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useFindHostedCourseProgress = (
  userId: string,
  hostedCourseId: string
) => {
  const query = gql`
    query FindHostedCourseProgressById($userId: ID!, $hostedCourseId: ID!) {
      findHostedCourseProgressById(
        userId: $userId
        hostedCourseId: $hostedCourseId
      ) {
        completedAt
        hostedCourseId
        items
        startedAt
        status
        userId
      }
    }
  `;
  const options = {
    variables: {
      userId,
      hostedCourseId
    },
    skip: !userId || !hostedCourseId,
    fetchPolicy: 'network-only' as const
  };
  const { refetch, loading, error, data } = useQuery<
    FindHostedCourseProgressByIdQuery,
    FindHostedCourseProgressByIdQueryVariables
  >(query, options);
  return useMemo(
    () => ({
      hostedCourseProgressLoading: loading,
      hostedCourseProgressError: error,
      hostedCourseProgress: (data?.findHostedCourseProgressById ??
        {}) as FindHostedCourseProgressByIdQuery['findHostedCourseProgressById'],
      fetchHostedCourseProgress: (userId: string, hostedCourseId: string) =>
        refetch({
          userId,
          hostedCourseId
        })
    }),
    [loading, error, data, refetch]
  );
};
