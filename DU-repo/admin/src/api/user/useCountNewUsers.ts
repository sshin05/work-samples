import { gql, useQuery } from '@apollo/client';
import type {
  CountNewUsersQuery,
  CountNewUsersQueryVariables
} from '@/api/codegen/graphql';

export const useCountNewUsers = (branch = '', dayRange: number) => {
  const query = gql`
    query CountNewUsers($branch: String!, $dayRange: SafeInt) {
      countNewUsers(branch: $branch, dayRange: $dayRange)
    }
  `;
  const { loading, error, data } = useQuery<
    CountNewUsersQuery,
    CountNewUsersQueryVariables
  >(query, {
    fetchPolicy: 'network-only',
    variables: {
      branch,
      dayRange
    }
  });
  return {
    countNewUsersLoading: loading,
    countNewUsersError: error,
    countNewUsers: data?.countNewUsers ?? null
  };
};
