import { gql, useMutation } from '@apollo/client';
import type {
  DeleteLibraryItemInput,
  DeleteLibraryItemMutation,
  DeleteLibraryItemMutationVariables
} from '@/api/codegen/graphql';

export const useDeleteLibraryItem = () => {
  const mutation = gql`
    mutation DeleteLibraryItem($input: DeleteLibraryItemInput!) {
      deleteLibraryItem(input: $input) {
        id
        libraryItems {
          id
          type
          name
          url
        }
      }
    }
  `;
  const [_deleteLibraryItem, { error, loading, data }] = useMutation<
    DeleteLibraryItemMutation,
    DeleteLibraryItemMutationVariables
  >(mutation);
  const deleteLibraryItem = async (input: DeleteLibraryItemInput) => {
    _deleteLibraryItem({
      variables: {
        input
      }
    });
  };
  return {
    deleteLibraryItem,
    deleteLibraryItemError: error,
    deleteLibraryItemLoading: loading,
    deleteLibraryItemData: data?.deleteLibraryItem ?? null
  };
};
