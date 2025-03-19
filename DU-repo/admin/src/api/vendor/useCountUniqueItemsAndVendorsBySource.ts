import { gql, useQuery } from '@apollo/client';
import type {
  CountUniqueItemsAndVendorsBySourceQuery,
  CountUniqueItemsAndVendorsBySourceQueryVariables
} from '@/api/codegen/graphql';

export const useCountUniqueItemsAndVendorsBySource = (source: string) => {
  const query = gql`
    query countUniqueItemsAndVendorsBySource($source: String!) {
      countUniqueItemsAndVendorsBySource(source: $source) {
        items
        vendors
      }
    }
  `;
  const { loading, error, data } = useQuery<
    CountUniqueItemsAndVendorsBySourceQuery,
    CountUniqueItemsAndVendorsBySourceQueryVariables
  >(query, {
    variables: {
      source
    },
    skip: !source,
    fetchPolicy: 'network-only'
  });
  return {
    totalItems: data?.countUniqueItemsAndVendorsBySource?.items ?? 0,
    totalVendors: data?.countUniqueItemsAndVendorsBySource?.vendors ?? 0,
    countUniqueItemsAndVendorsBySourceLoading: loading,
    countUniqueItemsAndVendorsBySourceError: error
  };
};
