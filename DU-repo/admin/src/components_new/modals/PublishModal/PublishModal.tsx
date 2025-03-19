import { ConfirmModal } from '@cerberus/react';
import type { PublishModalProps } from './PublishModal.types';
import { ConfirmActionModal } from '@/components_new/modals/ConfirmActionModal';

export const PublishModal = ({
  title,
  message,
  onConfirm
}: PublishModalProps) => (
  <ConfirmModal>
    <ConfirmActionModal
      heading={title}
      description={message}
      actionText="Confirm"
      cancelText="Cancel"
      handleSubmit={onConfirm}
      buttonContent="Publish"
      usage="filled"
    />
  </ConfirmModal>
);
