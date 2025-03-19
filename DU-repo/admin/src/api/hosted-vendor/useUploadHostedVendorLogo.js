import { gql, useMutation } from '@apollo/client';

export const useUploadHostedVendorLogo = () => {
  const mutation = gql`
    mutation UploadHostedVendorLogo($id: ID!, $file: Upload!) {
      uploadHostedVendorLogo(id: $id, file: $file) {
        id
        name
        logoUrl
      }
    }
  `;

  const [uploadHostedVendorLogo, { loading, error, data }] =
    useMutation(mutation);

  return {
    uploadHostedVendorLogo,
    uploadHostedVendorLogoLoading: loading,
    uploadHostedVendorLogoError: error,
    uploadHostedVendorLogoData: data
  };
};
