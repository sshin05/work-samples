import { gql, useMutation } from '@apollo/client';
import type {
  UpdateIsMarketplaceEnabledInput,
  UpdateIsMarketplaceEnabledMutation,
  UpdateIsMarketplaceEnabledMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateIsMarketplaceEnabled = () => {
  const mutation = gql`
    mutation UpdateIsMarketplaceEnabled(
      $input: UpdateIsMarketplaceEnabledInput!
    ) {
      updateIsMarketplaceEnabled(input: $input) {
        id
        name
        isMarketplaceEnabled
      }
    }
  `;
  const [updateIsMarketplaceEnabled, { loading, error, data }] = useMutation<
    UpdateIsMarketplaceEnabledMutation,
    UpdateIsMarketplaceEnabledMutationVariables
  >(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return {
    updateIsMarketplaceEnabledLoading: loading,
    updateIsMarketplaceEnabledError: error,
    updateIsMarketplaceEnabledData: data?.updateIsMarketplaceEnabled,
    updateIsMarketplaceEnabled: async (
      input: UpdateIsMarketplaceEnabledInput
    ) =>
      updateIsMarketplaceEnabled({
        variables: {
          input
        }
      })
  };
};
