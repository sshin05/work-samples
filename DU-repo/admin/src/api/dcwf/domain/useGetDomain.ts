import { gql, useQuery } from '@apollo/client';
import type {
  GetDomainQuery,
  GetDomainQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useGetDomain = ({ getDomainId }: GetDomainQueryVariables) => {
  const query = gql`
    query GetDomain($getDomainId: ID!) {
      getDomain(id: $getDomainId) {
        id
        name
        shortDescription
        description
      }
    }
  `;

  const { data, loading, error } = useQuery<
    GetDomainQuery,
    GetDomainQueryVariables
  >(query, {
    variables: {
      getDomainId
    }
  });

  return useMemo(
    () => ({
      domain: data?.getDomain,
      domainLoading: loading,
      domainError: error
    }),
    [data, loading, error]
  );
};
