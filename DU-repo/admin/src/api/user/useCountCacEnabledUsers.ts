import { gql, useQuery } from '@apollo/client';
import type {
  CountCacEnabledUsersQuery,
  CountCacEnabledUsersQueryVariables
} from '@/api/codegen/graphql';

export const useCountCacEnabledUsers = (branch: string) => {
  const query = gql`
    query CountCacEnabledUsers($branch: String!) {
      countCacEnabledUsers(branch: $branch)
    }
  `;
  const { loading, error, data } = useQuery<
    CountCacEnabledUsersQuery,
    CountCacEnabledUsersQueryVariables
  >(query, {
    fetchPolicy: 'network-only',
    variables: {
      branch
    }
  });
  return {
    countCacEnabledUsersLoading: loading,
    countCacEnabledUsersError: error,
    countCacEnabledUsers: data?.countCacEnabledUsers || null
  };
};
