import { gql, useMutation } from '@apollo/client';
import type {
  EnableExportsByTypesForMissionPartnerMutation,
  EnableExportsByTypesForMissionPartnerMutationVariables
} from '@/api/codegen/graphql';

export const useEnableExportsByTypesForMissionPartnerId = () => {
  const mutation = gql`
    mutation EnableExportsByTypesForMissionPartner(
      $downloadTypes: [String!]!
      $missionPartnerId: String!
    ) {
      enableExportsByTypesForMissionPartner(
        downloadTypes: $downloadTypes
        missionPartnerId: $missionPartnerId
      ) {
        id
        name
        affiliateId
        logoUrl
        slug
        enabledReports {
          id
          name
          description
        }
      }
    }
  `;
  const [enableExportsByTypesForMissionPartner, { loading, error, data }] =
    useMutation<
      EnableExportsByTypesForMissionPartnerMutation,
      EnableExportsByTypesForMissionPartnerMutationVariables
    >(mutation);
  return {
    enableExportsByTypesForMissionPartner: async (
      downloadTypes: string[],
      missionPartnerId: string
    ) =>
      enableExportsByTypesForMissionPartner({
        variables: {
          downloadTypes,
          missionPartnerId
        }
      }),
    enableExportsByTypesForMissionPartnerLoading: loading,
    enableExportsByTypesForMissionPartnerError: error,
    enableExportsByTypesForMissionPartnerData:
      data?.enableExportsByTypesForMissionPartner || null
  };
};
