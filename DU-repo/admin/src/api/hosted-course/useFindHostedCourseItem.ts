import { gql, useQuery } from '@apollo/client';
import type {
  FindHostedCourseItemQuery,
  FindHostedCourseItemQueryVariables
} from '@/api/codegen/graphql';

export const useFindHostedCourseItem = (
  id: FindHostedCourseItemQueryVariables['id'],
  itemId: FindHostedCourseItemQueryVariables['itemId']
) => {
  const query = gql`
    query FindHostedCourseItem($id: ID!, $itemId: ID!) {
      findHostedCourseItem(id: $id, itemId: $itemId) {
        item
        status
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    FindHostedCourseItemQuery,
    FindHostedCourseItemQueryVariables
  >(query, {
    skip: !id || !itemId,
    variables: {
      id,
      itemId
    },
    fetchPolicy: 'network-only'
  });
  return {
    fetchHostedCourseItem: async (
      id: FindHostedCourseItemQueryVariables['id'],
      itemId: FindHostedCourseItemQueryVariables['itemId']
    ) =>
      refetch({
        id,
        itemId
      }),
    hostedCourseItemLoading: loading,
    hostedCourseItemError: error,
    hostedCourseItemData: data?.findHostedCourseItem
  };
};
