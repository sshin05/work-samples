import { gql, useMutation } from '@apollo/client';
import type {
  UpdateLibraryItemsInput,
  UpdateLibraryItemsMutation,
  UpdateLibraryItemsMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateLibraryItems = () => {
  const mutation = gql`
    mutation UpdateLibraryItems($input: UpdateLibraryItemsInput!) {
      updateLibraryItems(input: $input) {
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
  const [_updateLibraryItems, { loading, error, data }] = useMutation<
    UpdateLibraryItemsMutation,
    UpdateLibraryItemsMutationVariables
  >(mutation);
  const updateLibraryItems = async (input: UpdateLibraryItemsInput) => {
    _updateLibraryItems({
      variables: {
        input
      }
    });
  };
  return {
    updateLibraryItems,
    updateLibraryItemsLoading: loading,
    updateLibraryItemsError: error,
    updateLibraryItemsData: data?.updateLibraryItems ?? null
  };
};
