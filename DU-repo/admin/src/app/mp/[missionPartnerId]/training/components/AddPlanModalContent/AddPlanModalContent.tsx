'use client';
import React from 'react';
import { TextInput, TextArea } from '@/components_new/form';
import { vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { useNotificationCenter } from '@cerberus/react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateForceMultiplier } from '@/api/force-multipliers';
import { MissionPartnerModalActionBar } from '@/components_new/modals/MissionPartnerModalActionBar/MissionPartnerModalActionBar';
import { type FindMissionPartnerByIdQuery } from '@/api/codegen/graphql';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';

interface AddPlanModalProps {
  missionPartner: FindMissionPartnerByIdQuery['findMissionPartnerById'];
  onClose: () => void;
  onSubmit: (id: string) => void;
}

const MAX_INPUT_LENGTH = 500;

export const AddPlanModalContent = ({
  missionPartner,
  onClose,
  onSubmit
}: AddPlanModalProps) => {
  const { notify } = useNotificationCenter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<{ title: string; description: string }>({
    defaultValues: {
      title: '',
      description: ''
    }
  });

  // Mutations
  const { createForceMultiplier } = useCreateForceMultiplier();

  const handleCreateNewItem = async ({
    title,
    description
  }: {
    title: string;
    description: string;
  }) => {
    await createForceMultiplier({
      title,
      summary: description,
      missionPartnerId: missionPartner.id
    })
      .then(response => {
        const { id } = response.data.createForceMultiplier;
        return onSubmit(id);
      })
      .catch(error => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: error?.message.includes('title is')
            ? error.message
            : 'There was an error creating the plan.'
        });
      });
  };

  const closeModal = () => {
    reset();
    onClose();
  };

  return (
    <div
      className={vstack({
        gap: '8',
        w: 'full'
      })}
    >
      <StandardModalHeader title="New training plan" onClose={closeModal} />
      <form
        className={vstack({ w: 'full', alignItems: 'flex-start' })}
        onSubmit={handleSubmit(handleCreateNewItem)}
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: 'The item title is required.' }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              className={css({ w: '31rem' })}
              label="Title"
              errorMessage={error?.message}
              autoComplete="off"
              required
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{
            required: 'Description is required',
            maxLength: 500
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextArea
              {...field}
              className={css({ w: '31rem' })}
              label="Description"
              inputLength={field.value?.length}
              maxLength={MAX_INPUT_LENGTH}
              errorMessage={error?.message}
              required
            />
          )}
        />
        <MissionPartnerModalActionBar
          onClose={closeModal}
          actionText="Create training plan"
          disabled={isSubmitting}
          loading={isSubmitting}
        />
      </form>
    </div>
  );
};
