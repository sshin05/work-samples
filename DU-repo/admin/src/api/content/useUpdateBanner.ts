import { gql, useMutation } from '@apollo/client';
import type {
  UpdateBannerMutation,
  UpdateBannerMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateBanner = () => {
  const mutation = gql`
    mutation updateBanner(
      $title: String!
      $body: String!
      $buttonText: String!
      $buttonLink: String!
      $logo: Upload!
    ) {
      updateBanner(
        title: $title
        body: $body
        buttonText: $buttonText
        buttonLink: $buttonLink
        logo: $logo
      ) {
        id
        content {
          title
          body
          buttonText
          buttonLink
          logo
        }
      }
    }
  `;
  const [updateBanner, { loading, error, data }] = useMutation<
    UpdateBannerMutation,
    UpdateBannerMutationVariables
  >(mutation);
  return {
    updateBanner: async (
      title: string,
      body: string,
      buttonText: string,
      buttonLink: string,
      logo: File | string
    ) =>
      updateBanner({
        variables: {
          title,
          body,
          buttonText,
          buttonLink,
          logo
        }
      }),
    updateBannerLoading: loading,
    updateBannerError: error,
    content: data?.updateBanner?.content
  };
};
