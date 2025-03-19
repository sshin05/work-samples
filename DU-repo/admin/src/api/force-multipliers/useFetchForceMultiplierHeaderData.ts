import { gql, useQuery } from '@apollo/client';
import type {
  FetchForceMultiplierHeaderDataQuery,
  FetchForceMultiplierHeaderDataQueryVariables
} from '@/api/codegen/graphql';

export const useFetchForceMultiplierHeaderData = (forceMultiplerId = '') => {
  const query = gql`
    query FetchForceMultiplierHeaderData($forceMultiplerId: ID!) {
      findLatestForceMultiplierByIdAdmin(id: $forceMultiplerId) {
        id
        title
        status
        version
      }
    }
  `;
  const { refetch, data, loading, error } = useQuery<
    FetchForceMultiplierHeaderDataQuery,
    FetchForceMultiplierHeaderDataQueryVariables
  >(query, {
    skip: !forceMultiplerId,
    variables: {
      forceMultiplerId: forceMultiplerId || ''
    }
  });
  return {
    refetch,
    data: data?.findLatestForceMultiplierByIdAdmin,
    loading,
    error
  };
};
