import { gql, useQuery } from '@apollo/client';
import type {
  CountAllUsersQuery,
  CountAllUsersQueryVariables
} from '@/api/codegen/graphql';

export const useCountAllUsers = (
  branch?: string,
  trainingGroup?: string,
  fieldCommand?: string,
  spaceDelta?: string,
  squadron?: string,
  organization?: string
) => {
  const query = gql`
    query CountAllUsers(
      $branch: String
      $trainingGroup: String
      $fieldCommand: String
      $spaceDelta: String
      $squadron: String
      $organization: String
    ) {
      countAllUsers(
        branch: $branch
        trainingGroup: $trainingGroup
        fieldCommand: $fieldCommand
        spaceDelta: $spaceDelta
        squadron: $squadron
        organization: $organization
      )
    }
  `;
  const {
    loading,
    error,
    data,
    refetch: refetchCountUsers
  } = useQuery<CountAllUsersQuery, CountAllUsersQueryVariables>(query, {
    fetchPolicy: 'network-only',
    variables: {
      branch,
      trainingGroup,
      fieldCommand,
      spaceDelta,
      squadron,
      organization
    }
  });
  return {
    countUsersLoading: loading,
    countUsersError: error,
    countUsers: data?.countAllUsers || null,
    refetchCountUsers
  };
};
