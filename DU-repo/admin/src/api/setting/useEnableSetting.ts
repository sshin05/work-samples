import { gql, useMutation } from '@apollo/client';
import type {
  EnableSettingMutation,
  EnableSettingMutationVariables
} from '@/api/codegen/graphql';

export const useEnableSetting = () => {
  const mutation = gql`
    mutation EnableSetting($id: ID!) {
      enableSetting(id: $id) {
        id
        name
        enabled
      }
    }
  `;
  const [update, { loading, error, data }] = useMutation<
    EnableSettingMutation,
    EnableSettingMutationVariables
  >(mutation, {
    refetchQueries: ['FindAllSettings']
  });
  return {
    enableSetting: async (id: string) =>
      update({
        variables: {
          id
        }
      }),
    enableSettingLoading: loading,
    enableSettingError: error,
    enableSettingData: data
  };
};
