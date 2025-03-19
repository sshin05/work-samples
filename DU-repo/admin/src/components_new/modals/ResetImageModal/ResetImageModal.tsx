import { Reset } from '@cerberus/icons';
import { Button, useConfirmModal } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { useCallback } from 'react';

interface ResetImageModalProps {
  handleSelectImage: (file: any) => Promise<void> | void;
  disabled?: boolean;
}

export const ResetImageModal = ({
  handleSelectImage,
  disabled
}: ResetImageModalProps) => {
  const confirm = useConfirmModal();

  const handleConfirm = useCallback(async () => {
    const consent = await confirm.show({
      heading: 'Remove your image?',
      description:
        'This will remove your uploaded image and replace with the default training plan image. ',
      actionText: 'Reset Image',
      cancelText: 'Go Back'
    });
    if (consent) await handleSelectImage(null);
  }, [confirm, handleSelectImage]);

  return (
    <Button
      className={css({ mt: '2.5' })}
      palette="action"
      shape="rounded"
      usage="ghost"
      type="button"
      onClick={handleConfirm}
      disabled={disabled}
    >
      Reset to Default Image
      <Reset />
    </Button>
  );
};
