import { gql, useMutation } from '@apollo/client';
import type {
  UpdateGlobalBannerMutation,
  UpdateGlobalBannerMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateAlertBanner = () => {
  const mutation = gql`
    mutation updateGlobalBanner(
      $title: String
      $content: String!
      $isDismissable: Boolean!
    ) {
      updateAlertBanner(
        title: $title
        content: $content
        isDismissable: $isDismissable
      ) {
        id
        content {
          title
          content
          isDismissable
        }
      }
    }
  `;
  const [updateAlertBanner, { loading, error }] = useMutation<
    UpdateGlobalBannerMutation,
    UpdateGlobalBannerMutationVariables
  >(mutation);
  return {
    updateAlertBanner: async (
      title: string,
      content: string,
      isDismissable: boolean
    ) =>
      updateAlertBanner({
        variables: {
          title,
          content,
          isDismissable
        }
      }),
    updateAlertBannerLoading: loading,
    updateAlertBannerError: error
  };
};
