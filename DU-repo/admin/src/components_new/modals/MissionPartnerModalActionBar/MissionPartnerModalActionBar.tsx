import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';

export const MissionPartnerModalActionBar = ({
  disabled,
  actionText,
  onClose,
  loading,
  onSubmit = () => {
    /* Do nothing by default */
  }
}) => (
  <>
    <div className={hstack({ gap: '4' })}>
      <Button
        palette="action"
        shape="rounded"
        usage="filled"
        type="submit"
        disabled={disabled}
        onClick={onSubmit}
      >
        {actionText}
      </Button>
      <Button
        usage="outlined"
        type="reset"
        shape="rounded"
        onClick={onClose}
        disabled={loading}
        className={css({ w: '100px' })}
      >
        Cancel
      </Button>
    </div>
  </>
);
