import { gql, useLazyQuery } from '@apollo/client';
import type {
  FindUsersByGroupIdQuery,
  FindUsersByGroupIdQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY: never[] = [];

export const useFindUsersByGroupId = () => {
  const query = gql`
    query FindUsersByGroupId($groupId: String!) {
      findUsersByGroupId(groupId: $groupId) {
        id
        email
        firstName
        lastName
      }
    }
  `;
  const [refetch, { loading, error, data }] = useLazyQuery<
    FindUsersByGroupIdQuery,
    FindUsersByGroupIdQueryVariables
  >(query, {
    fetchPolicy: 'network-only'
  });
  return {
    usersLoading: loading,
    usersError: error,
    users: data?.findUsersByGroupId || STATIC_ARRAY,
    fetchUsersByGroupId: (groupId: string) =>
      refetch({
        variables: {
          groupId
        }
      })
  };
};
