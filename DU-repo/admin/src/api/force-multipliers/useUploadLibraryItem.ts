import { gql, useMutation } from '@apollo/client';
import type {
  UploadLibraryItemInput,
  UploadLibraryItemMutation,
  UploadLibraryItemMutationVariables
} from '@/api/codegen/graphql';
import { useCallback } from 'react';

export const useUploadLibraryItem = () => {
  const mutation = gql`
    mutation UploadLibraryItem($input: UploadLibraryItemInput!) {
      uploadLibraryItem(input: $input) {
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
  const [_uploadLibraryItem, { loading, error, data }] = useMutation<
    UploadLibraryItemMutation,
    UploadLibraryItemMutationVariables
  >(mutation);
  const uploadLibraryItem = useCallback(
    async (input: UploadLibraryItemInput) => {
      return _uploadLibraryItem({
        variables: {
          input
        }
      });
    },
    [_uploadLibraryItem]
  );
  return {
    uploadLibraryItem,
    uploadLibraryItemLoading: loading,
    uploadLibraryItemError: error,
    uploadLibraryItemData: data?.uploadLibraryItem || null
  };
};
