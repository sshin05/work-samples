import { gql, useMutation } from '@apollo/client';
import type {
  ExportMissionPartnerLicenseRequestsMutation,
  ExportMissionPartnerLicenseRequestsMutationVariables
} from '@/api/codegen/graphql';

export const useExportMissionPartnerLicenseRequests = () => {
  const mutation = gql`
    mutation ExportMissionPartnerLicenseRequests(
      $missionPartnerId: ID!
      $missionPartnerName: String!
      $vendorName: String
      $branch: String
    ) {
      exportMissionPartnerLicenseRequests(
        missionPartnerId: $missionPartnerId
        missionPartnerName: $missionPartnerName
        vendorName: $vendorName
        branch: $branch
      )
    }
  `;
  const [exportMissionPartnerLicenseRequests, { loading, error }] = useMutation<
    ExportMissionPartnerLicenseRequestsMutation,
    ExportMissionPartnerLicenseRequestsMutationVariables
  >(mutation);
  return {
    exportMissionPartnerLicenseRequests: async (
      missionPartnerId: ExportMissionPartnerLicenseRequestsMutationVariables['missionPartnerId'],
      missionPartnerName: ExportMissionPartnerLicenseRequestsMutationVariables['missionPartnerName'],
      vendorName?: ExportMissionPartnerLicenseRequestsMutationVariables['vendorName'],
      branch?: ExportMissionPartnerLicenseRequestsMutationVariables['branch']
    ) =>
      exportMissionPartnerLicenseRequests({
        variables: {
          missionPartnerId,
          missionPartnerName,
          vendorName,
          branch
        }
      }),
    exportMissionPartnerLicenseRequestsLoading: loading,
    exportMissionPartnerLicenseRequestsError: error
  };
};
