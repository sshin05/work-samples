import { useState } from 'react';
import {
  Button,
  IconButton,
  Portal,
  Modal,
  ModalDescription,
  useModal,
  trapFocus
} from '@cerberus/react';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { Edit } from '@cerberus/icons';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';
import { Controller, useForm } from 'react-hook-form';
import { TextArea, TextInput } from '@/components_new/form';

interface EditCollectionModalProps {
  onSubmit: (
    missionPartnerId: string,
    collectionObject: { name: string; description: string }
  ) => Promise<void>;
  collections: {
    name: string;
    description: string;
  };
  missionPartnerId: string;
}

export const EditCollectionModal = ({
  onSubmit,
  collections,
  missionPartnerId
}: EditCollectionModalProps) => {
  const collectionObject = {
    ...collections,
    name: collections?.name,
    description: collections?.description
  };
  const [errorMessage, setErrorMessage] = useState<string>('');

  const editCollectionModal = useModal();
  const handleKeyDownOnEditCollectionModal = trapFocus(
    editCollectionModal.modalRef
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  const handleOnSubmit = async data => {
    if (data.collectionName === '') {
      setErrorMessage('Error: Collection name cannot be blank');
      return;
    } else {
      const updatedCollectionObject = {
        ...collections,
        name: data.collectionName,
        description: data.collectionDescription
      };

      await onSubmit(missionPartnerId, updatedCollectionObject);
    }

    editCollectionModal.close();
  };

  const onClose = () => {
    reset();
    editCollectionModal.close();
  };

  return (
    <>
      <IconButton
        className={css({ mr: '2' })}
        ariaLabel="editButton"
        palette="action"
        usage="ghost"
        size="lg"
        onClick={editCollectionModal.show}
      >
        <Edit color="black" />
      </IconButton>

      <Portal>
        <Modal
          onKeyDown={handleKeyDownOnEditCollectionModal}
          ref={editCollectionModal.modalRef}
        >
          {editCollectionModal.isOpen && (
            <div className={vstack({ gap: '2', alignItems: 'flex-start' })}>
              <StandardModalHeader title="Edit collection" onClose={onClose} />
              <ModalDescription>
                <p className={css({ textStyle: 'body-sm' })}>
                  Each collection will have its own tab on your hub page where
                  learners can explore all items around that topic.
                </p>
              </ModalDescription>
              {errorMessage && (
                <p className={css({ color: 'red' })}>{errorMessage}</p>
              )}
              <form
                className={vstack({
                  gap: '2',
                  alignItems: 'flex-start'
                })}
                onSubmit={handleSubmit(handleOnSubmit)}
              >
                <Controller
                  name="collectionName"
                  control={control}
                  rules={{ required: 'Collection name is required' }}
                  defaultValue={collectionObject?.name}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <TextInput
                      {...field}
                      className={css({ w: '31rem' })}
                      label="Collection name"
                      errorMessage={error?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="collectionDescription"
                  control={control}
                  rules={{ required: 'Collection description is required' }}
                  defaultValue={collectionObject?.description}
                  render={({
                    field: { ref, ...field },
                    fieldState: { error }
                  }) => (
                    <TextArea
                      {...field}
                      className={css({ w: '31rem' })}
                      label="Collection description"
                      errorMessage={error?.message}
                      required
                    />
                  )}
                />
                <div className={hstack({ gap: '4', w: 'full', mt: '6' })}>
                  <Button
                    disabled={isSubmitting}
                    palette="action"
                    shape="rounded"
                    usage="filled"
                    type="submit"
                    className={css({ w: 'full' })}
                  >
                    Save collection
                  </Button>

                  <Button
                    palette="action"
                    shape="rounded"
                    usage="outlined"
                    type="button"
                    onClick={onClose}
                    className={css({ w: 'full' })}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Modal>
      </Portal>
    </>
  );
};
