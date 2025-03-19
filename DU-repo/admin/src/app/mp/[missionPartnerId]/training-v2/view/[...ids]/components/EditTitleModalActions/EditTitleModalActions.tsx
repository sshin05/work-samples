'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@cerberus/react';
import { Flex } from '@cerberus/styled-system/jsx';
import { css } from '@cerberus/styled-system/css';

export const EditTitleModalActions = ({
  closeModal
}: {
  closeModal: () => void;
}) => {
  const { pending } = useFormStatus();

  return (
    <Flex alignItems="center" w="full" gap="md" mt="md">
      <Button
        type="submit"
        usage="filled"
        shape="rounded"
        className={css({ flex: 1 })}
        disabled={pending}
        aria-busy={pending}
      >
        {pending ? 'Saving...' : 'Save'}
      </Button>
      <Button
        usage="outlined"
        shape="rounded"
        className={css({ flex: 1 })}
        onClick={closeModal}
        type="button"
        disabled={pending}
      >
        Cancel
      </Button>
    </Flex>
  );
};
