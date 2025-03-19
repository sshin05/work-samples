import { gql, useMutation } from '@apollo/client';
import type {
  DeleteBannerMutation,
  DeleteBannerMutationVariables
} from '@/api/codegen/graphql';

export const useDeleteBanner = () => {
  const mutation = gql`
    mutation deleteBanner {
      deleteBanner
    }
  `;
  const [deleteBanner, { loading, error, data }] = useMutation<
    DeleteBannerMutation,
    DeleteBannerMutationVariables
  >(mutation);
  return {
    deleteBanner: async () => deleteBanner(),
    deleteBannerLoading: loading,
    deleteBannerError: error,
    deleteBannerData: data
  };
};
