'use client';
import { Add } from '@carbon/icons-react';
import {
  Modal,
  ModalHeader,
  ModalHeading,
  ModalDescription,
  trapFocus,
  useModal,
  Button,
  Portal
} from '@cerberus/react';

export const AddCurriculumModal = () => {
  const { modalRef, show, close } = useModal();
  const handleKeyDown = trapFocus(modalRef);

  return (
    <div>
      <Button
        palette="action"
        shape="rounded"
        aria-label="add curriculum"
        onClick={show}
      >
        Add Curriculum
        <Add />
      </Button>

      <Portal>
        <Modal onKeyDown={handleKeyDown} ref={modalRef}>
          <ModalHeader>
            <ModalHeading>This is a custom modal</ModalHeading>
          </ModalHeader>
          <ModalDescription>
            This is a custom modal that is can be whatever you need.
          </ModalDescription>

          <Button usage="outlined" onClick={close}>
            Close
          </Button>
        </Modal>
      </Portal>
    </div>
  );
};
