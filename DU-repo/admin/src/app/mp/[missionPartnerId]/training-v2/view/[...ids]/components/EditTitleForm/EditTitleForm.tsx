'use client';

import type { Blocks } from '@digital-u/services/block/types';
import { useEffect, useActionState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  FieldMessage,
  Input,
  Label,
  Field,
  Textarea,
  ModalDescription,
  ModalHeading,
  ModalHeader
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { VStack } from '@cerberus/styled-system/jsx';
import { updateBlockTitleAndDescriptionAction } from '@/app/mp/[missionPartnerId]/training-v2/actions/update-block';
import { EditTitleModalActions } from '../EditTitleModalActions/';

export const EditTitleForm = ({ currentBlock }: { currentBlock: Blocks }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [state, formAction] = useActionState(
    updateBlockTitleAndDescriptionAction,
    null
  );

  const handleCloseModal = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  useEffect(() => {
    if (state?.message === 'Block updated successfully') {
      handleCloseModal();
    }
  }, [state, handleCloseModal]);

  return (
    <form action={formAction} className={css({ w: 'full' })}>
      <VStack alignItems="flex-start" gap="md" w="full">
        <ModalHeader>
          <ModalHeading>Name your curriculum</ModalHeading>
        </ModalHeader>
        <ModalDescription>
          You can change this later in settings.
        </ModalDescription>
      </VStack>

      <input type="hidden" name="id" value={currentBlock.id} />

      <Field required>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={currentBlock.title} />
      </Field>

      <Field required>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={currentBlock.description}
        />
      </Field>

      {state?.error && (
        <Field invalid>
          <FieldMessage id="error-title">
            {state.message}: {state.error}
          </FieldMessage>
        </Field>
      )}

      <EditTitleModalActions closeModal={handleCloseModal} />
    </form>
  );
};
