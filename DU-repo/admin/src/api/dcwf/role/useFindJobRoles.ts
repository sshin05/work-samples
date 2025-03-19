import { gql, useQuery } from '@apollo/client';
import type {
  FindJobRolesQuery,
  FindJobRolesQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useFindJobRoles = ({
  filter,
  pageSize = 25,
  pageNumber = 1,
  sortDirection,
  sortBy
}: FindJobRolesQueryVariables) => {
  const query = gql`
    query FindJobRoles(
      $filter: JobRoleFilter
      $pageSize: Int
      $pageNumber: Int
      $sortDirection: SortDirection
      $sortBy: JobRoleSortBy
    ) {
      findJobRoles(
        filter: $filter
        pageSize: $pageSize
        pageNumber: $pageNumber
        sortDirection: $sortDirection
        sortBy: $sortBy
      ) {
        data {
          id
          roleId
          name
          description
        }
        total
      }
    }
  `;

  const { data, loading, error } = useQuery<
    FindJobRolesQuery,
    FindJobRolesQueryVariables
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
      jobRoles: data?.findJobRoles.data || [],
      jobRolesTotal: data?.findJobRoles.total || 0,
      jobRolesLoading: loading,
      jobRolesError: error
    }),
    [data, loading, error]
  );
};
