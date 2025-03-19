import { Button, useConfirmModal } from '@cerberus/react';
import { useCallback } from 'react';
import type { ConfirmActionModalProps } from './confirmActionModal.types';

export const ConfirmActionModal = ({
  heading,
  description,
  actionText,
  cancelText,
  handleSubmit,
  onClose,
  buttonContent,
  disabled,
  usage = 'ghost'
}: ConfirmActionModalProps) => {
  const confirm = useConfirmModal();

  const handleConfirm = useCallback(async () => {
    const consent = await confirm.show({
      heading,
      description,
      actionText,
      cancelText
    });

    if (consent) await handleSubmit();
    else {
      if (onClose) onClose();
    }
  }, [
    actionText,
    cancelText,
    confirm,
    description,
    handleSubmit,
    heading,
    onClose
  ]);

  return (
    <Button
      palette="action"
      shape="rounded"
      usage={usage}
      type="button"
      onClick={handleConfirm}
      disabled={disabled}
    >
      {buttonContent}
    </Button>
  );
};
