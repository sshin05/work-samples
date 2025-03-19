import { gql, useMutation } from '@apollo/client';
import type {
  UpdateVendorInput,
  UpdateVendorMutation,
  UpdateVendorMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateVendor = () => {
  const mutation = gql`
    mutation UpdateVendor($input: UpdateVendorInput!) {
      updateVendor(input: $input) {
        id
        name
      }
    }
  `;
  const [update, { loading, error, data }] = useMutation<
    UpdateVendorMutation,
    UpdateVendorMutationVariables
  >(mutation);
  return {
    updateVendor: async (input: UpdateVendorInput) =>
      update({
        variables: {
          input
        }
      }),
    updateVendorLoading: loading,
    updateVendorError: error,
    updateVendorData: data
  };
};
