import { gql, useMutation } from '@apollo/client';
import type {
  CreateVendorInput,
  CreateVendorMutation,
  CreateVendorMutationVariables
} from '@/api/codegen/graphql';

export const useCreateVendor = () => {
  const mutation = gql`
    mutation CreateVendor($input: CreateVendorInput!) {
      createVendor(input: $input) {
        id
        name
        isLicensed
      }
    }
  `;
  const [create, { loading, error, data }] = useMutation<
    CreateVendorMutation,
    CreateVendorMutationVariables
  >(mutation, {
    refetchQueries: ['FindLicensedVendors'],
    awaitRefetchQueries: true
  });
  return {
    createVendor: async (input: CreateVendorInput) =>
      create({
        variables: {
          input
        }
      }),
    createVendorLoading: loading,
    createVendorError: error,
    createVendorData: data
  };
};
