import { CloseLarge } from '@cerberus/icons';
import { IconButton, ModalHeader, ModalHeading } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import type { StandardModalHeaderProps } from './stanrdardModalHeader.types';

export const StandardModalHeader = ({
  title,
  onClose
}: StandardModalHeaderProps) => {
  return (
    <ModalHeader className={css({ w: 'full' })}>
      <div className={hstack({ w: 'full', justifyContent: 'space-between' })}>
        <ModalHeading>{title}</ModalHeading>
        <IconButton
          ariaLabel="modalCloseButton"
          palette="action"
          usage="ghost"
          size="lg"
          type="button"
          onClick={onClose}
        >
          <CloseLarge />
        </IconButton>
      </div>
    </ModalHeader>
  );
};
