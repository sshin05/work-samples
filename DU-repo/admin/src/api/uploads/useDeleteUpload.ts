import { useMemo } from 'react';
import { gql, useMutation } from '@apollo/client';
import type {
  DeleteUploadMutation,
  DeleteUploadMutationVariables
} from '@/api/codegen/graphql';
import { GET_USER_UPLOADS_QUERY } from './queries/GET_USER_UPLOADS_QUERY';

export const useDeleteUpload = () => {
  const mutation = gql`
    mutation DeleteUpload($id: ID!) {
      deleteUpload(id: $id)
    }
  `;
  const [deleteUpload, { loading, error, data }] = useMutation<
    DeleteUploadMutation,
    DeleteUploadMutationVariables
  >(mutation, {
    refetchQueries: [
      {
        query: GET_USER_UPLOADS_QUERY,
        variables: {},
        fetchPolicy: 'network-only'
      }
    ]
  });
  return useMemo(
    () => ({
      deleteUpload: (id: string) =>
        deleteUpload({
          variables: {
            id
          }
        }),
      deleteUploadLoading: loading,
      deleteUploadError: error,
      deleteUploadData: data?.deleteUpload || null
    }),
    [loading, error, data, deleteUpload]
  );
};
