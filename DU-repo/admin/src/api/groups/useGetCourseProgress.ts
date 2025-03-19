import { gql, useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';

const STATIC_ARRAY: never[] = [];

export const useGetCourseProgress = (options?: { groupId: string }) => {
  const query = gql`
    query GetCourseProgress($groupId: ID!) {
      getCourseProgress(groupId: $groupId) {
        id
        title
        type
        vendorName
        notStarted
        inProgress
        pendingReview
        completed
      }
    }
  `;

  const [refetch, { loading, error, data }] = useLazyQuery(query, {
    fetchPolicy: 'network-only',
    ...options
  });

  const useRefetch = useCallback(
    async (groupId: string) =>
      refetch({
        variables: {
          groupId
        }
      }),
    [refetch]
  );

  return {
    courseProgressLoading: loading,
    courseProgressError: error,
    courseProgress: data?.getCourseProgress || STATIC_ARRAY,
    fetchCourseProgress: useRefetch
  };
};
