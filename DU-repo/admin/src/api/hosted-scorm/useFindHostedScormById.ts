import { gql, useQuery } from '@apollo/client';
import type {
  FindHostedScormByIdQuery,
  FindHostedScormByIdQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

// TODO: scormUrl is never updated. It is always null.
export const useFindHostedScormById = (id: string) => {
  const query = gql`
    query FindHostedScormById($id: ID!) {
      findHostedScormById(id: $id) {
        id
        missionPartnerId
        name
        description
        duration
        status
        scormFilename
        scormUrl
        createdAt
        updatedAt
        __typename
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindHostedScormByIdQuery,
    FindHostedScormByIdQueryVariables
  >(query, {
    skip: !id,
    variables: {
      id
    }
  });

  return useMemo(
    () => ({
      hostedScormByIdLoading: loading,
      hostedScormByIdError: error,
      hostedScormById: (data?.findHostedScormById ??
        {}) as FindHostedScormByIdQuery['findHostedScormById'],
      fetchHostedScormById: (id: string) =>
        refetch({
          id
        })
    }),
    [loading, error, data, refetch]
  );
};
