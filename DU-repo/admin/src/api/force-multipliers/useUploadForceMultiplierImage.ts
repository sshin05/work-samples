import { gql, useMutation } from '@apollo/client';
import type {
  Scalars,
  UploadForceMultiplierImageMutation,
  UploadForceMultiplierImageMutationVariables
} from '@/api/codegen/graphql';

export const useUploadForceMultiplierImage = () => {
  const mutation = gql`
    mutation UploadForceMultiplierImage($file: Upload!, $id: ID!) {
      uploadForceMultiplierImage(file: $file, id: $id) {
        url
      }
    }
  `;
  const [_uploadForceMultiplierImage, { loading, error, data }] = useMutation<
    UploadForceMultiplierImageMutation,
    UploadForceMultiplierImageMutationVariables
  >(mutation);
  const uploadForceMultiplierImage = async (
    file: Scalars['Upload']['input'],
    id: Scalars['ID']['input']
  ) =>
    _uploadForceMultiplierImage({
      variables: {
        file,
        id
      }
    });
  return {
    uploadForceMultiplierImage,
    uploadForceMultiplierImageLoading: loading,
    uploadForceMultiplierImageError: error,
    uploadForceMultiplierImageData: data?.uploadForceMultiplierImage ?? null
  };
};
