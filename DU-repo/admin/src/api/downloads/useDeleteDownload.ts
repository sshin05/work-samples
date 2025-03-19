import { gql, useMutation } from '@apollo/client';
import type {
  DeleteDownloadMutation,
  DeleteDownloadMutationVariables
} from '@/api/codegen/graphql';
import { GET_USER_DOWNLOADS_QUERY } from './queries/GET_USER_DOWNLOADS_QUERY';

export const useDeleteDownload = () => {
  const mutation = gql`
    mutation DeleteDownload($id: ID!) {
      deleteDownload(id: $id)
    }
  `;
  const [_deleteDownload, { loading, error, data }] = useMutation<
    DeleteDownloadMutation,
    DeleteDownloadMutationVariables
  >(mutation, {
    refetchQueries: [GET_USER_DOWNLOADS_QUERY, 'GetUserDownloads']
  });
  const deleteDownload = async (id: string) =>
    _deleteDownload({
      variables: {
        id
      }
    });
  return {
    deleteDownload,
    deleteDownloadLoading: loading,
    deleteDownloadError: error,
    deleteDownloadData: data?.deleteDownload || null
  };
};
