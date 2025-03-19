import { gql, useMutation } from '@apollo/client';
import type {
  ExportMissionPartnerLicensesForVendorMutation,
  ExportMissionPartnerLicensesForVendorMutationVariables
} from '@/api/codegen/graphql';

export const useExportMissionPartnerLicensesForVendor = () => {
  const mutation = gql`
    mutation ExportMissionPartnerLicensesForVendor(
      $missionPartnerId: ID!
      $missionPartnerName: String!
      $vendorId: ID!
      $vendorName: String!
    ) {
      exportMissionPartnerLicensesForVendor(
        missionPartnerId: $missionPartnerId
        missionPartnerName: $missionPartnerName
        vendorId: $vendorId
        vendorName: $vendorName
      )
    }
  `;
  const [exportMissionPartnerLicensesForVendor, { loading, error }] =
    useMutation<
      ExportMissionPartnerLicensesForVendorMutation,
      ExportMissionPartnerLicensesForVendorMutationVariables
    >(mutation);
  return {
    exportMissionPartnerLicensesForVendor: async (
      missionPartnerId: string,
      missionPartnerName: string,
      vendorId: string,
      vendorName: string
    ) =>
      exportMissionPartnerLicensesForVendor({
        variables: {
          missionPartnerId,
          missionPartnerName,
          vendorId,
          vendorName
        }
      }),
    exportMissionPartnerLicensesForVendorLoading: loading,
    exportMissionPartnerLicensesForVendorError: error
  };
};
