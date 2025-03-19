import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

const VALID_SORT_FIELD_MAP = {
  markedCompleted: 'markedcompleted',
  pendingReview: 'pending'
};

export const useAggregateTranscriptCourses = (options: {
  missionPartnerId?: string;
  vendorId?: string;
  search?: string;
  sortField?: string;
  sortDirection?: string;
  pageSize?: number;
  pageNumber?: number;
}) => {
  const query = gql`
    query AggregateTranscriptCourses(
      $missionPartnerId: String
      $vendorId: String
      $search: String
      $sortField: String
      $sortDirection: String
      $pageSize: Int
      $pageNumber: Int
    ) {
      aggregateTranscriptCourses(
        missionPartnerId: $missionPartnerId
        vendorId: $vendorId
        search: $search
        sortField: $sortField
        sortDirection: $sortDirection
        pageSize: $pageSize
        pageNumber: $pageNumber
      ) {
        count
        data {
          courseId
          courseTitle
          vendorName
          total
          started
          stopped
          pendingReview
          markedCompleted
          completed
        }
      }
    }
  `;

  const cleanedSortField = options?.sortField
    ? VALID_SORT_FIELD_MAP[options?.sortField] || options.sortField
    : undefined;

  const { loading, error, data } = useQuery(query, {
    variables: {
      missionPartnerId: options.missionPartnerId || undefined,
      vendorId: options.vendorId || undefined,
      search: options.search || undefined,
      sortField: cleanedSortField,
      sortDirection: options.sortDirection || undefined,
      pageSize: options.pageSize || undefined,
      pageNumber: options.pageNumber || undefined
    }
  });

  return useMemo(
    () => ({
      transcriptCoursesLoading: loading,
      transcriptCoursesError: error,
      transcriptCoursesCount: data?.aggregateTranscriptCourses?.count || 0,
      transcriptCoursesData: data?.aggregateTranscriptCourses?.data
    }),
    [loading, error, data]
  );
};
