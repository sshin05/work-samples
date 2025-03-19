import { gql, useMutation } from '@apollo/client';
import { FIND_ALL_HOSTED_VENDORS_QUERY } from './queries/FIND_ALL_HOSTED_VENDORS_QUERY';

export const useCreateHostedVendor = input => {
  const mutation = gql`
    mutation CreateHostedVendor($input: CreateHostedVendorInput!) {
      createHostedVendor(input: $input) {
        id
        name
        logoUrl
      }
    }
  `;

  const [create, { loading, error, data }] = useMutation(mutation, {
    variables: { input },
    refetchQueries: [
      { query: FIND_ALL_HOSTED_VENDORS_QUERY },
      'FindAllHostedVendors'
    ]
  });

  return {
    createHostedVendor: input => create({ variables: { input } }),
    createHostedVendorLoading: loading,
    createHostedVendorError: error,
    createHostedVendorData: data
  };
};
