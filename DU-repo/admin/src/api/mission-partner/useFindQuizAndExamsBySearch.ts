import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

const STATIC_ARRAY = [];

interface FindQuizAndExamsBySearchInput {
  missionPartnerId: string;
  search?: string;
  sortKey?: string;
  sortDirection?: string;
  pageNumber?: number;
  pageSize?: number;
}

// removed: $sortBy: String;  $page: Int; $searchAfter: String

export const useFindQuizAndExamsBySearch = ({
  missionPartnerId,
  search,
  sortKey,
  sortDirection,
  pageNumber,
  pageSize
}: FindQuizAndExamsBySearchInput) => {
  const query = gql`
    query FindQuizAndExamsBySearch(
      $missionPartnerId: ID!
      $search: String
      $sortKey: String
      $sortDirection: SortDirection
      $pageNumber: SafeInt
      $pageSize: SafeInt
    ) {
      findQuizAndExamsBySearch(
        missionPartnerId: $missionPartnerId
        search: $search
        sortKey: $sortKey
        sortDirection: $sortDirection
        pageNumber: $pageNumber
        pageSize: $pageSize
      ) {
        records {
          completed
          itemId
          itemName
          itemType
          missionPartnerId
          started
          total
        }
        total
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery(query, {
    variables: {
      missionPartnerId,
      search,
      sortKey,
      sortDirection,
      pageNumber,
      pageSize
    },
    skip: !missionPartnerId
  });
  const total = useMemo(
    () => data?.findQuizAndExamsBySearch?.total || 0,
    [data?.findQuizAndExamsBySearch?.total]
  );
  return {
    quizExamsLoading: loading,
    quizExamsError: error,
    quizExams: data?.findQuizAndExamsBySearch?.records || STATIC_ARRAY,
    refetchSurveys: refetch,
    total
  };
};
