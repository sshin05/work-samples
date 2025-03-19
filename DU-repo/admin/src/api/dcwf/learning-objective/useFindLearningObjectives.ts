import { gql, useQuery } from '@apollo/client';
import type {
  FindLearningObjectivesQuery,
  FindLearningObjectivesQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useFindLearningObjectives = ({
  filter,
  pageSize,
  pageNumber,
  sortDirection,
  sortBy
}: FindLearningObjectivesQueryVariables) => {
  const query = gql`
    query FindLearningObjectives(
      $filter: LearningObjectiveFilter
      $pageSize: Int
      $pageNumber: Int
      $sortDirection: SortDirection
      $sortBy: LearningObjectiveSortBy
    ) {
      findLearningObjectives(
        filter: $filter
        pageSize: $pageSize
        pageNumber: $pageNumber
        sortDirection: $sortDirection
        sortBy: $sortBy
      ) {
        data {
          id
          description
        }
        total
      }
    }
  `;

  const { data, loading, error } = useQuery<
    FindLearningObjectivesQuery,
    FindLearningObjectivesQueryVariables
  >(query, {
    variables: {
      filter,
      pageSize,
      pageNumber,
      sortDirection,
      sortBy
    }
  });

  return useMemo(
    () => ({
      learningObjectives: data?.findLearningObjectives.data || [],
      learningObjectivesTotal: data?.findLearningObjectives.total || 0,
      learningObjectivesLoading: loading,
      learningObjectivesError: error
    }),
    [data, loading, error]
  );
};
