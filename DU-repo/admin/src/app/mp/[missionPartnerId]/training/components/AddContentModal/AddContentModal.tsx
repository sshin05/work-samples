import { Controller, useForm } from 'react-hook-form';
import { vstack } from '@cerberus/styled-system/patterns';
import { Button, Modal, Portal } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack } from 'styled-system/patterns';
import type { AddContentModalProps } from './AddContentModal.types';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';
import { FieldSelect } from '@/components_new/form';

export const AddContentModal = ({
  onSubmit,
  modal,
  handleKeyDown,
  options
}: AddContentModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({ defaultValues: { type: '' } });

  const onClose = () => {
    reset();
    modal.close();
  };

  const onSubmitButtonClick = async data => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Portal>
      <Modal onKeyDown={handleKeyDown} ref={modal.modalRef}>
        {modal.isOpen && (
          <>
            <StandardModalHeader title="Add new content" onClose={onClose} />
            <form
              className={css({ mt: '6' })}
              onSubmit={handleSubmit(onSubmitButtonClick)}
            >
              <div className={vstack({ alignItems: 'start', gap: '8' })}>
                <Controller
                  name="type"
                  control={control}
                  rules={{
                    required: 'An item type is required.',
                    validate: value =>
                      value !== 'no-choice' && value !== undefined
                  }}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <FieldSelect
                      {...field}
                      label="Type"
                      options={options}
                      errorMessage={error?.message}
                      required
                    />
                  )}
                />
                <div className={hstack()}>
                  <Button
                    disabled={isSubmitting}
                    palette="action"
                    shape="rounded"
                    usage="filled"
                    type="submit"
                  >
                    Add Content
                  </Button>
                  <Button
                    disabled={false}
                    palette="action"
                    shape="rounded"
                    usage="outlined"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </>
        )}
      </Modal>
    </Portal>
  );
};
