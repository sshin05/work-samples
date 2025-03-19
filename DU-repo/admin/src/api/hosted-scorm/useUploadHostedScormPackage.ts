import { gql, useMutation } from '@apollo/client';
import type {
  HostedScormPackageInput,
  UploadHostedScormPackageMutation,
  UploadHostedScormPackageMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useUploadHostedScormPackage = () => {
  const mutation = gql`
    mutation UploadHostedScormPackage(
      $packageInput: HostedScormPackageInput!
      $missionPartnerId: ID
    ) {
      uploadHostedScormPackage(
        input: $packageInput
        missionPartnerId: $missionPartnerId
      ) {
        id
        missionPartnerId
        name
        description
        duration
        status
        scormFilename
        scormUrl
        createdAt
        updatedAt
      }
    }
  `;
  const [uploadHostedScormPackage, { loading, error, data }] = useMutation<
    UploadHostedScormPackageMutation,
    UploadHostedScormPackageMutationVariables
  >(mutation);
  return useMemo(
    () => ({
      uploadHostedScormPackage: async (
        packageInput: HostedScormPackageInput,
        missionPartnerId: string
      ) =>
        uploadHostedScormPackage({
          variables: {
            packageInput,
            missionPartnerId
          }
        }),
      uploadHostedScormPackageLoading: loading,
      uploadHostedScormPackageError: error,
      uploadHostedScormPackageData: data
    }),
    [loading, error, data, uploadHostedScormPackage]
  );
};
