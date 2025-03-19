import { gql, useLazyQuery } from '@apollo/client';
import type {
  FindDomainsQuery,
  FindDomainsQueryVariables
} from '@/api/codegen/graphql';
import { useCallback } from 'react';

const STATIC_ARRAY = [];

export const useFindDomainsLazy = () => {
  const query = gql`
    query FindDomainsLazy(
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

  const [fetchDomainsQuery, { loading, error, data }] = useLazyQuery<
    FindDomainsQuery,
    FindDomainsQueryVariables
  >(query, {
    fetchPolicy: 'network-only'
  });

  const fetchDomains = useCallback(
    async ({
      filter,
      pageSize = 25,
      pageNumber = 1,
      sortByMostRelevant,
      sortDirection,
      sortBy
    }: FindDomainsQueryVariables) => {
      if (!filter) return;
      await fetchDomainsQuery({
        variables: {
          filter,
          pageNumber,
          pageSize,
          sortByMostRelevant,
          sortDirection,
          sortBy
        }
      });
    },
    [fetchDomainsQuery]
  );

  return {
    domainsLoading: loading,
    domainsError: error,
    domains: data?.findDomains?.data || STATIC_ARRAY,
    fetchDomains
  };
};
