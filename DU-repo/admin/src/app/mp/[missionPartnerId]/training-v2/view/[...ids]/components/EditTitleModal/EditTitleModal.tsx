'use client';

import { createRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Blocks } from '@digital-u/services/block/types';
import { Modal, Portal, useModal, trapFocus } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { EditTitleForm } from '../EditTitleForm/';

export const EditTitleModal = ({ currentBlock }: { currentBlock: Blocks }) => {
  const { modalRef, show, close, isOpen } = useModal();
  const handleKeyDown = trapFocus(modalRef);

  const searchParams = useSearchParams();
  const editTitle = searchParams.get('editTitle');
  const buttonRef = createRef<HTMLButtonElement>();

  useEffect(() => {
    if (editTitle && buttonRef.current && modalRef.current) {
      buttonRef.current.click();
    }

    if (!editTitle && isOpen) {
      close();
    }
  }, [editTitle, buttonRef, close, isOpen]);

  return (
    <Portal>
      <button
        className={css({ display: 'none' })}
        ref={buttonRef}
        onClick={show}
      >
        Edit Title
      </button>

      <Modal onKeyDown={handleKeyDown} ref={modalRef}>
        <EditTitleForm currentBlock={currentBlock} />
      </Modal>
    </Portal>
  );
};
