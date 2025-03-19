import { removeIcon } from '@/components_new/table/styles/toolbar-styles';
import { TrashCan } from '@cerberus/icons';
import { IconButton, useConfirmModal } from '@cerberus/react';
import { useCallback } from 'react';

interface RemoveMissionPartnerVendorModalProps {
  vendorId: string;
  vendorName: string;
  handleRemoveVendor: (vendorId: string) => Promise<void>;
}

export const RemoveMissionPartnerVendorModalContent = ({
  vendorId,
  vendorName,
  handleRemoveVendor
}: RemoveMissionPartnerVendorModalProps) => {
  const confirm = useConfirmModal();

  const handleConfirm = useCallback(async () => {
    const consent = await confirm.show({
      heading: 'Remove vendor',
      description: `Are you sure you want to remove vendor ${vendorName}?`,
      actionText: 'Confirm',
      cancelText: 'Cancel'
    });
    if (consent) await handleRemoveVendor(vendorId);
  }, [confirm, handleRemoveVendor, vendorId, vendorName]);

  return (
    <IconButton
      className={removeIcon}
      onClick={handleConfirm}
      ariaLabel="Delete"
      disabled={false}
      palette="danger"
      size="sm"
      usage="ghost"
    >
      <TrashCan />
    </IconButton>
  );
};
