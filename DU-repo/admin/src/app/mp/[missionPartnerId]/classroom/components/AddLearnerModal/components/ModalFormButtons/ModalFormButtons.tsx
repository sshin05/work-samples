import { Button, Spinner } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';

export type ModalFormButtonsProps = {
  isSubmittingForm: boolean;
  onClose: () => void;
};

export const ModalFormButtons = ({
  isSubmittingForm,
  onClose
}: ModalFormButtonsProps) => {
  return (
    <div
      className={flex({
        mt: 8,
        w: 'full'
      })}
    >
      <Button
        disabled={isSubmittingForm}
        palette="action"
        shape="rounded"
        usage="filled"
        type="submit"
        className={css({
          mr: '4',
          flex: '1 1 auto'
        })}
      >
        {isSubmittingForm && <Spinner size="1em" />}
        Add
      </Button>
      <Button
        usage="outlined"
        shape="rounded"
        onClick={onClose}
        type="button"
        className={css({
          flex: '1 1 auto'
        })}
      >
        Cancel
      </Button>
    </div>
  );
};
