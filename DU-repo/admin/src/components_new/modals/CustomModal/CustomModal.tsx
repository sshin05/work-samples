import {
  Modal,
  Portal,
  trapFocus,
  type UseModalReturnValue
} from '@cerberus/react';
import { StandardModalHeader } from '../StandardModalHeader';
import { css } from '@cerberus/styled-system/css';

export const CustomModal = ({
  customModal,
  title,
  onClose,
  children,
  modalStyles
}: {
  customModal: UseModalReturnValue;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  modalStyles?: string;
}) => {
  const handleKeyDownOnCustomModal = trapFocus(customModal.modalRef);

  return (
    <Portal>
      <Modal
        {...(modalStyles && { className: modalStyles })}
        onKeyDown={handleKeyDownOnCustomModal}
        ref={customModal.modalRef}
      >
        {customModal.isOpen && (
          <>
            <StandardModalHeader title={title} onClose={onClose} />
            <div className={css({ mt: '8' })}>{children}</div>
          </>
        )}
      </Modal>
    </Portal>
  );
};
