import { Button, ModalDescription } from '@cerberus/react';
import { vstack, hstack } from 'styled-system/patterns';
import { css } from 'styled-system/css';
import { Controller, useForm } from 'react-hook-form';
import { TextArea, TextInput } from '@/components_new/form';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';

interface CollectionObject {
  name: string | null;
  description: string;
}
interface CreateCollectionModalProps {
  onSubmit: (
    missionPartnerId: string,
    collectionObject: CollectionObject
  ) => Promise<void>;
  onClose: () => void;
  missionPartnerId: string;
}

export const CreateCollectionModal = ({
  onSubmit,
  onClose,
  missionPartnerId
}: CreateCollectionModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: { collectionName: '', collectionDescription: '' }
  });

  const handleCreateCollection = async data => {
    await onSubmit(missionPartnerId, {
      name: data.collectionName,
      description: data.collectionDescription
    });
    reset();
    onClose();
  };

  return (
    <div className={vstack({ gap: '2', alignItems: 'center' })}>
      <StandardModalHeader title="Create a collection" onClose={onClose} />
      <ModalDescription>
        <p className={css({ textStyle: 'body-sm' })}>
          Each collection will have its own tab on your hub page where learners
          can explore all items around that topic.
        </p>
      </ModalDescription>
      <form
        className={vstack({ w: 'full', gap: '4', alignItems: 'flex-start' })}
        onSubmit={handleSubmit(handleCreateCollection)}
      >
        <Controller
          name="collectionName"
          control={control}
          rules={{
            required: 'Collection name is required'
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              className={css({ w: '31rem' })}
              label="Collection name"
              helpText='e.g. "Artificial intelligence"'
              errorMessage={error?.message}
              required
            />
          )}
        />
        <Controller
          name="collectionDescription"
          control={control}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextArea
              {...field}
              className={css({ w: '31rem' })}
              label="Description"
              errorMessage={error?.message}
              helpText="Help learners understand what this collection of curriculum items is about."
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
            Create collection
          </Button>
          <Button
            disabled={false}
            palette="action"
            shape="rounded"
            usage="outlined"
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className={css({ w: 'full' })}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
