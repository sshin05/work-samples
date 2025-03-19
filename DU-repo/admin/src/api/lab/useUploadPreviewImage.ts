import { gql, useMutation } from '@apollo/client';
import type {
  UploadPreviewImageMutation,
  UploadPreviewImageMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

const STATIC_OBJECT: unknown = {};

export const useUploadPreviewImage = () => {
  const mutation = gql`
    mutation UploadPreviewImage($labId: ID!, $file: Upload!) {
      uploadPreviewImage(labId: $labId, file: $file) {
        id
        previewImageUrl
      }
    }
  `;
  const [uploadPreviewImage, { loading, error, data }] = useMutation<
    UploadPreviewImageMutation,
    UploadPreviewImageMutationVariables
  >(mutation);
  return useMemo(
    () => ({
      uploadPreviewImage: (labId: string, file: unknown) =>
        uploadPreviewImage({
          variables: {
            labId,
            file
          }
        }),
      uploadPreviewImageLoading: loading,
      uploadPreviewImageError: error,
      uploadPreviewImageData: data?.uploadPreviewImage ?? STATIC_OBJECT
    }),
    [loading, error, data, uploadPreviewImage]
  );
};
