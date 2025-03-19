import { gql, useMutation } from '@apollo/client';
import type {
  DisableExportsByTypesForMissionPartnerMutation,
  DisableExportsByTypesForMissionPartnerMutationVariables
} from '@/api/codegen/graphql';

export const useDisableExportsByTypesForMissionPartnerId = () => {
  const mutation = gql`
    mutation DisableExportsByTypesForMissionPartner(
      $downloadTypes: [String!]!
      $missionPartnerId: String!
    ) {
      disableExportsByTypesForMissionPartner(
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
  const [disableExportsByTypesForMissionPartner, { loading, error, data }] =
    useMutation<
      DisableExportsByTypesForMissionPartnerMutation,
      DisableExportsByTypesForMissionPartnerMutationVariables
    >(mutation);
  return {
    disableExportsByTypesForMissionPartner: async (
      downloadTypes: string[],
      missionPartnerId: string
    ) =>
      disableExportsByTypesForMissionPartner({
        variables: {
          downloadTypes,
          missionPartnerId
        }
      }),
    disableExportsByTypesForMissionPartnerLoading: loading,
    disableExportsByTypesForMissionPartnerError: error,
    disableExportsByTypesForMissionPartnerData:
      data?.disableExportsByTypesForMissionPartner || null
  };
};
