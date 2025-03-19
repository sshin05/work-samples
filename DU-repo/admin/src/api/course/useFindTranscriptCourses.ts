import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

export const useFindTranscriptCourses = (options: {
  missionPartnerId?: string;
  groupId?: string;
  courseId?: string;
  planType?: string;
  planSourceId?: string;
  status?: string;
  userSearch?: string;
  courseTitleSearch?: string;
  sortField?: string;
  sortDirection?: string;
  pageSize?: number;
  pageNumber?: number;
  branch?: string;
}) => {
  const query = gql`
    query FindTranscriptCourses(
      $missionPartnerId: String
      $groupId: String
      $courseId: String
      $planType: String
      $planSourceId: String
      $status: String
      $userSearch: String
      $courseTitleSearch: String
      $sortField: String
      $sortDirection: String
      $pageSize: Int
      $pageNumber: Int
      $branch: String
    ) {
      findTranscriptCourses(
        missionPartnerId: $missionPartnerId
        groupId: $groupId
        courseId: $courseId
        planType: $planType
        planSourceId: $planSourceId
        status: $status
        userSearch: $userSearch
        courseTitleSearch: $courseTitleSearch
        sortField: $sortField
        sortDirection: $sortDirection
        pageSize: $pageSize
        pageNumber: $pageNumber
        branch: $branch
      ) {
        count
        data {
          userId
          courseId
          status
          startedAt
          stoppedAt
          pendingReviewAt
          markedCompletedAt
          completedAt
          course {
            id
            courseTitle
            vendorId
            vendorCourseId
          }
          user {
            id
            email
            firstName
            lastName
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(query, {
    variables: {
      missionPartnerId: options.missionPartnerId || undefined,
      groupId: options.groupId || undefined,
      courseId: options.courseId || undefined,
      planType: options.planType || undefined,
      planSourceId: options.planSourceId || undefined,
      status: options.status || undefined,
      userSearch: options.userSearch || undefined,
      courseTitleSearch: options.courseTitleSearch || undefined,
      sortField: options.sortField || undefined,
      sortDirection: options.sortDirection || undefined,
      pageSize: options.pageSize || undefined,
      pageNumber: options.pageNumber || undefined,
      branch: options.branch || undefined
    },
    fetchPolicy: 'cache-and-network',
    skip: !options.missionPartnerId
  });

  return useMemo(
    () => ({
      transcriptCoursesLoading: loading,
      transcriptCoursesError: error,
      transcriptCoursesCount: data?.findTranscriptCourses?.count || 0,
      transcriptCoursesData: data?.findTranscriptCourses?.data
    }),
    [loading, error, data]
  );
};
