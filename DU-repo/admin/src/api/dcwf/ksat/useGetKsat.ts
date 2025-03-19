import { gql, useQuery } from '@apollo/client';
import type {
  GetKsatQuery,
  GetKsatQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useGetKsat = ({ getKsatId }: GetKsatQueryVariables) => {
  const query = gql`
    query GetKsat($getKsatId: ID!) {
      getKsat(id: $getKsatId) {
        id
        code
        ksatType
        description
        domain {
          id
          name
          shortDescription
          description
        }
      }
    }
  `;

  const { data, loading, error } = useQuery<
    GetKsatQuery,
    GetKsatQueryVariables
  >(query, {
    variables: {
      getKsatId
    }
  });

  return useMemo(
    () => ({
      ksat: data?.getKsat,
      ksatLoading: loading,
      ksatError: error
    }),
    [data, loading, error]
  );
};
