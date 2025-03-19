import type { RefObject } from 'react';

export type CohortUploadLibraryItemModalProps = {
  modalRef: RefObject<HTMLDialogElement | null>;
  close: () => void;
  show: () => void;
  isOpen: boolean;
};
