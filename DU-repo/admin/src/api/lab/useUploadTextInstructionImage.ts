import { gql, useMutation } from '@apollo/client';
import type {
  UploadTextInstructionImageMutation,
  UploadTextInstructionImageMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

const STATIC_OBJECT: unknown = {};

export const useUploadTextInstructionImage = () => {
  const mutation = gql`
    mutation UploadTextInstructionImage($labId: ID!, $file: Upload!) {
      uploadTextInstructionImage(labId: $labId, file: $file) {
        url
      }
    }
  `;
  const [uploadTextInstructionImage, { loading, error, data }] = useMutation<
    UploadTextInstructionImageMutation,
    UploadTextInstructionImageMutationVariables
  >(mutation);
  return useMemo(
    () => ({
      uploadTextInstructionImage: (labId: string, file: unknown) =>
        uploadTextInstructionImage({
          variables: {
            labId,
            file
          }
        }),
      uploadTextInstructionImageLoading: loading,
      uploadTextInstructionImageError: error,
      uploadTextInstructionImageData:
        data?.uploadTextInstructionImage ?? STATIC_OBJECT
    }),
    [loading, error, data, uploadTextInstructionImage]
  );
};
