import { gql, useQuery } from '@apollo/client';
import type {
  FindTranscriptCoursesByUserIdQuery,
  FindTranscriptCoursesByUserIdQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useFindTranscriptCoursesByUserId = (userId: string) => {
  const query = gql`
    query findTranscriptCoursesByUserId($userId: ID!) {
      findTranscriptCoursesByUserId(userId: $userId) {
        data {
          id
          courseTitle
          courseDescription
          courseDuration
          courseImage
          dateUpdated
          courseUrl
          startedAt
          markedCompletedAt
          completedAt
          vendorName
          status
        }
        total
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindTranscriptCoursesByUserIdQuery,
    FindTranscriptCoursesByUserIdQueryVariables
  >(query, {
    variables: {
      userId
    },
    skip: !userId
  });

  return {
    transcriptCoursesLoading: loading,
    transcriptCoursesError: error,
    transcriptCourses:
      data?.findTranscriptCoursesByUserId?.data || STATIC_ARRAY,
    total: data?.findTranscriptCoursesByUserId?.total || 0,
    refetchTranscriptCourses: refetch
  };
};
