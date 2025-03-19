import { gql, useMutation } from '@apollo/client';
import type {
  Scalars,
  UploadMissionPartnerLogoMutation,
  UploadMissionPartnerLogoMutationVariables
} from '@/api/codegen/graphql';

export const useUploadMissionPartnerLogo = () => {
  const mutation = gql`
    mutation UploadMissionPartnerLogo($file: Upload, $missionPartnerId: ID!) {
      uploadMissionPartnerLogo(
        file: $file
        missionPartnerId: $missionPartnerId
      ) {
        url
      }
    }
  `;
  const [uploadMissionPartnerLogo, { loading, error, data }] = useMutation<
    UploadMissionPartnerLogoMutation,
    UploadMissionPartnerLogoMutationVariables
  >(mutation, {
    refetchQueries: [
      'FindMissionPartnerById',
      'FindAllMissionPartnersMinDetails'
    ]
  });

  return {
    uploadMissionPartnerLogoLoading: loading,
    uploadMissionPartnerLogoError: error,
    uploadMissionPartnerLogoData: data?.uploadMissionPartnerLogo,
    uploadMissionPartnerLogo: async (
      file: Scalars['Upload'],
      missionPartnerId: string
    ) =>
      uploadMissionPartnerLogo({
        variables: {
          file,
          missionPartnerId
        }
      })
  };
};
