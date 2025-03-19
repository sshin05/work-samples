import { useEffect } from 'react';
import {
  Avatar,
  Button,
  Modal,
  ModalDescription,
  ModalHeader,
  ModalHeading,
  Spinner,
  trapFocus,
  useModal
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import { Information } from '@carbon/icons-react';

type ConfirmationModalProps = {
  isRemovingItemFromCart: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmationModal = ({
  isRemovingItemFromCart,
  onConfirm,
  onClose
}: ConfirmationModalProps) => {
  const { modalRef, show: showModal, close: closeModal } = useModal();

  const editModalHandleKeyDown = trapFocus(modalRef);

  useEffect(() => {
    showModal();
  }, []);

  const handleClose = () => {
    closeModal();
    onClose();
  };

  return (
    <Modal onKeyDown={editModalHandleKeyDown} ref={modalRef}>
      <Avatar
        ariaLabel=""
        gradient="hades-dark"
        icon={<Information size={24} />}
        src=""
        className={css({ mx: 'auto', mb: 4 })}
      />

      <ModalHeader>
        <ModalHeading>Are you sure you want to do this?</ModalHeading>
      </ModalHeader>
      <ModalDescription
        className={css({
          whiteSpace: 'normal',
          fontWeight: '400',
          mt: 2,
          mb: 0
        })}
      >
        Removing the training from the cart will permanently delete any seats,
        dates, or details associated with this cart entry.
      </ModalDescription>

      <div
        className={hstack({
          mt: '8',
          mb: '0',
          w: '100%'
        })}
      >
        <Button
          palette="danger"
          shape="sharp"
          usage="filled"
          className={css({ flex: '1 1 50%' })}
          onClick={onConfirm}
        >
          {isRemovingItemFromCart && <Spinner size="1em" />}
          Remove Item
        </Button>
        <Button
          usage="outlined"
          onClick={handleClose}
          type="button"
          className={css({ flex: '1 1 50%' })}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
