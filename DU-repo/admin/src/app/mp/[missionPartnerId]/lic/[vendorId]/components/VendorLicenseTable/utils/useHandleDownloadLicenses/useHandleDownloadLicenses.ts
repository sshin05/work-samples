import { useCallback } from 'react';
import { useExportMissionPartnerLicensesForVendor } from '@/api/license';
import { useNotificationCenter } from '@cerberus/react';

export const useHandleDownloadLicenses = ({
  missionPartnerId,
  missionPartnerName,
  vendorId,
  vendorName
}) => {
  const { notify } = useNotificationCenter();
  const {
    exportMissionPartnerLicensesForVendor,
    exportMissionPartnerLicensesForVendorLoading
  } = useExportMissionPartnerLicensesForVendor();

  const handleDownloadLicenses = useCallback(async () => {
    await exportMissionPartnerLicensesForVendor(
      missionPartnerId,
      missionPartnerName,
      vendorId,
      vendorName
    )
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Success',
          description: `The export has been started. You will receive an email when it is ready.`
        })
      )
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error exporting licenses.'
        })
      );
  }, [
    exportMissionPartnerLicensesForVendor,
    notify,
    missionPartnerId,
    missionPartnerName,
    vendorId,
    vendorName
  ]);

  return {
    handleDownloadLicenses,
    downloadingLicenses: exportMissionPartnerLicensesForVendorLoading
  };
};
