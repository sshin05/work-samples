import type { KeyboardEventHandler } from 'react';
import type { UseModalReturnValue } from '@cerberus/react';

interface AddContentModalProps {
  onSubmit: ({ type }: { type: unknown }) => Promise<void> | void;
  modal: UseModalReturnValue;
  handleKeyDown: KeyboardEventHandler<HTMLDialogElement>;
  options: { label: string; value: string }[];
}

export type { AddContentModalProps };
