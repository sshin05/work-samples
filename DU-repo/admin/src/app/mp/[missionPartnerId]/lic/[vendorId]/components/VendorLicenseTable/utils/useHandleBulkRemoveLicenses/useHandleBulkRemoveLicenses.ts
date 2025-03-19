import { useRevokeVendorLicensesForUsers } from '@/api/users';
import { useNotificationCenter } from '@cerberus/react';
import { useCallback } from 'react';

export const useHandleBulkRemoveLicenses = ({
  missionPartnerId,
  vendorId,
  refetchLicenses
}) => {
  const { notify } = useNotificationCenter();
  const { revokeVendorLicensesForUsers, revokeVendorLicensesForUsersLoading } =
    useRevokeVendorLicensesForUsers();

  const handleBulkRemoveLicenses = useCallback(
    async file => {
      await revokeVendorLicensesForUsers(file, missionPartnerId, vendorId)
        .then(() => {
          notify({
            palette: 'success',
            heading: 'Success',
            description: `You will receive an email when the file has finished processing.`
          });
        })
        .catch(() =>
          notify({
            palette: 'danger',
            heading: 'Error',
            description: 'There was an error removing licenses.'
          })
        )
        .finally(() => {
          refetchLicenses(); // this used to be an opensearch polling thing.
        });
    },
    [
      missionPartnerId,
      vendorId,
      notify,
      refetchLicenses,
      revokeVendorLicensesForUsers
    ]
  );

  return {
    handleBulkRemoveLicenses,
    revokeVendorLicensesForUsersLoading
  };
};
