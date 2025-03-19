import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

interface FindSurveysBySearchInput {
  missionPartnerId: string;
  search?: string;
  sortKey?: string;
  sortDirection?: string;
  pageNumber?: number;
  pageSize?: number;
}

export const useFindSurveysBySearch = ({
  missionPartnerId,
  search,
  pageNumber,
  pageSize,
  sortKey,
  sortDirection
}: FindSurveysBySearchInput) => {
  const query = gql`
    query FindSurveysBySearch(
      $missionPartnerId: ID!
      $search: String
      $sortKey: String
      $sortDirection: SortDirection
      $pageNumber: SafeInt
      $pageSize: SafeInt
    ) {
      findSurveysBySearch(
        missionPartnerId: $missionPartnerId
        search: $search
        sortKey: $sortKey
        sortDirection: $sortDirection
        pageNumber: $pageNumber
        pageSize: $pageSize
      ) {
        records {
          missionPartnerId
          hostedSurveyId
          hostedSurveyName
          total
          started
          completed
        }
        total
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    variables: {
      missionPartnerId,
      search: search || undefined,
      sortKey: sortKey || undefined,
      sortDirection: sortDirection || undefined,
      pageNumber: pageNumber || 1,
      pageSize: pageSize || 10
    },
    skip: !missionPartnerId
  });
  const total = useMemo(
    () => data?.findSurveysBySearch?.total || 0,
    [data?.findSurveysBySearch?.total]
  );

  return {
    surveysLoading: loading,
    surveysError: error,
    surveys: data?.findSurveysBySearch?.records,
    total
  };
};
