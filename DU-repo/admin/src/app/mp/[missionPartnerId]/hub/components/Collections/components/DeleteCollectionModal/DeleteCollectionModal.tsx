import { IconButton, useConfirmModal } from '@cerberus/react';
import { TrashCan } from '@cerberus/icons';
import { useCallback } from 'react';

interface DeleteCollectionModalProps {
  onSubmit: (
    missionPartnerId: string,
    collection: { id: string; name: string }
  ) => void;
  collection: { id: string; name: string };
  missionPartnerId: string;
}

export const DeleteCollectionModal = ({
  onSubmit,
  collection,
  missionPartnerId
}: DeleteCollectionModalProps) => {
  const confirm = useConfirmModal();

  const handleConfirm = useCallback(async () => {
    const consent = await confirm.show({
      heading: 'Delete collection?',
      description: `Are you sure you want to delete ${collection?.name}? Deleting a
          collection removes the items in it as well.`,
      actionText: 'Delete collection',
      cancelText: 'Cancel'
    });
    if (consent) onSubmit(missionPartnerId, collection);
  }, [collection, confirm, missionPartnerId, onSubmit]);

  return (
    <IconButton
      onClick={handleConfirm}
      ariaLabel="Delete"
      disabled={false}
      palette="danger"
      size="sm"
      usage="ghost"
    >
      <TrashCan color="red" />
    </IconButton>
  );
};
