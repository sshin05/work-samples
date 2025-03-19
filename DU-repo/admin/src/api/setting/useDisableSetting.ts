import { gql, useMutation } from '@apollo/client';
import type {
  DisableSettingMutation,
  DisableSettingMutationVariables
} from '@/api/codegen/graphql';

export const useDisableSetting = () => {
  const mutation = gql`
    mutation DisableSetting($id: ID!) {
      disableSetting(id: $id) {
        id
        name
        enabled
      }
    }
  `;
  const [update, { loading, error, data }] = useMutation<
    DisableSettingMutation,
    DisableSettingMutationVariables
  >(mutation, {
    refetchQueries: ['FindAllSettings']
  });
  return {
    disableSetting: async (id: string) =>
      update({
        variables: {
          id
        }
      }),
    disableSettingLoading: loading,
    disableSettingError: error,
    disableSettingData: data
  };
};
