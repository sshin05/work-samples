import { gql, useMutation } from '@apollo/client';

export const useUpdateHostedVendor = () => {
  const mutation = gql`
    mutation UpdateHostedVendor($input: UpdateHostedVendorInput!) {
      updateHostedVendor(input: $input) {
        id
        name
        logoUrl
      }
    }
  `;

  const [updateHostedVendor, { loading, error, data }] = useMutation(mutation);

  return {
    updateHostedVendor,
    updateHostedVendorLoading: loading,
    updateHostedVendorError: error,
    updateHostedVendorData: data
  };
};
