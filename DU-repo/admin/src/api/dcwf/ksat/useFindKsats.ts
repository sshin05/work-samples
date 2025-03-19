import { gql, useQuery } from '@apollo/client';
import type {
  FindKsatsQuery,
  FindKsatsQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useFindKsats = ({
  filter,
  pageSize = 25,
  pageNumber = 1,
  sortDirection,
  sortBy
}: FindKsatsQueryVariables) => {
  const query = gql`
    query FindKsats($filter: KsatFilter, $pageSize: Int, $pageNumber: Int, $sortDirection: SortDirection, $sortBy: KsatSortBy) {
      findKsats(filter: $filter, pageSize: $pageSize, pageNumber: $pageNumber, sortDirection: $sortDirection, sortBy: $sortBy) {
        total
        data {
          ksatType
          id
          domain {
            description
            id
            name
            shortDescription
          }
          code
          description
        }
      }
    }
  `;

  const { data, loading, error } = useQuery<
    FindKsatsQuery,
    FindKsatsQueryVariables
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
      ksats: (data?.findKsats.data ||
        []) as FindKsatsQuery['findKsats']['data'],
      ksatsTotal: data?.findKsats.total || 0,
      ksatsLoading: loading,
      ksatsError: error
    }),
    [data, loading, error]
  );
};
