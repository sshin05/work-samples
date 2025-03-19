import { gql, useMutation } from '@apollo/client';
import type {
  DeleteAlertBannerMutation,
  DeleteAlertBannerMutationVariables
} from '@/api/codegen/graphql';

export const useRemoveAlertBanner = () => {
  const mutation = gql`
    mutation deleteAlertBanner {
      deleteAlertBanner
    }
  `;
  const [removeAlertBanner, { loading, error }] = useMutation<
    DeleteAlertBannerMutation,
    DeleteAlertBannerMutationVariables
  >(mutation);
  return {
    removeAlertBanner: removeAlertBanner,
    removeAlertBannerLoading: loading,
    removeAlertBannerError: error
  };
};
