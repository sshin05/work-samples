import { gql, useQuery } from '@apollo/client';
import type {
  FindDomainsQuery,
  FindDomainsQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useFindDomains = ({
  filter,
  pageSize = 25,
  pageNumber = 1,
  sortByMostRelevant,
  sortDirection,
  sortBy
}: FindDomainsQueryVariables) => {
  const query = gql`
    query FindDomains(
      $filter: DomainFilter
      $pageSize: Int
      $pageNumber: Int
      $sortByMostRelevant: SortByMostRelevant
      $sortDirection: SortDirection
      $sortBy: DomainSortBy
    ) {
      findDomains(
        filter: $filter
        pageSize: $pageSize
        pageNumber: $pageNumber
        sortByMostRelevant: $sortByMostRelevant
        sortDirection: $sortDirection
        sortBy: $sortBy
      ) {
        data {
          id
          name
          shortDescription
          description
        }
        total
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindDomainsQuery,
    FindDomainsQueryVariables
  >(query, {
    variables: {
      filter,
      pageSize,
      pageNumber,
      sortByMostRelevant,
      sortDirection,
      sortBy
    }
  });

  return useMemo(
    () => ({
      domains: data?.findDomains.data || [],
      domainsTotal: data?.findDomains.total || 0,
      domainsLoading: loading,
      domainsError: error
    }),
    [data, loading, error]
  );
};
