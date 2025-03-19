import { gql, useQuery } from '@apollo/client';
import type {
  FindContentByIdQuery,
  FindContentByIdQueryVariables
} from '@/api/codegen/graphql';

const STATIC_OBJECT = {};

export const useContent = (id: string) => {
  const query = gql`
    query FindContentById($id: ID!) {
      findContentById(id: $id) {
        id
        content
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindContentByIdQuery,
    FindContentByIdQueryVariables
  >(query, {
    variables: {
      id
    }
  });
  return {
    contentLoading: loading,
    contentError: error,
    content: data?.findContentById?.content || STATIC_OBJECT,
    refetchContent: refetch
  };
};
