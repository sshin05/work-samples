import { useRemoveLicenses } from '@/api/license';
import { useNotificationCenter } from '@cerberus/react';
import { useCallback } from 'react';

export const useHandleRemoveLicenses = ({
  vendorId,
  missionPartnerId,
  selectedUsersRef,
  setSelectedUsersLength,
  setShowCheckboxes,
  setSelectedRows,
  refetchLicenses
}) => {
  const { notify } = useNotificationCenter();
  const { removeLicenses, removeLicensesLoading } = useRemoveLicenses();

  const handleRemoveLicenses = useCallback(async () => {
    await removeLicenses(vendorId, missionPartnerId, selectedUsersRef.current)
      .then(() => {
        selectedUsersRef.current = []; // reset selected users
        setSelectedUsersLength(0); // clear selected users length
        setShowCheckboxes(false); // reset showCheckboxes
        setSelectedRows({}); // reset selected rows
        notify({
          palette: 'success',
          heading: 'Success',
          description: `The licenses have been successfully revoked.`
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
  }, [
    refetchLicenses,
    missionPartnerId,
    notify,
    removeLicenses,
    selectedUsersRef,
    vendorId,
    setShowCheckboxes,
    setSelectedUsersLength,
    setSelectedRows
  ]);

  return {
    handleRemoveLicenses,
    removeLicensesLoading
  };
};
