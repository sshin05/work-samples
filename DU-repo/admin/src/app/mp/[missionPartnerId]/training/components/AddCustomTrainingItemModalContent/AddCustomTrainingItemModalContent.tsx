'use client';
import { vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { TextInput, FieldSelect } from '@/components_new/form';
import { Controller, useForm } from 'react-hook-form';
import { useGetSession } from '@/hooks/useGetSession';
import { useCreateSurvey } from '@/api/survey';
import { useCreateHostedScorm } from '@/api/hosted-scorm';
import { useCreateHostedExam } from '@/api/hosted-exam';
import { useCreateHostedCourse } from '@/api/hosted-course';
import { useCreateLab } from '@/api/lab';
import { MissionPartnerModalActionBar } from '@/components_new/modals/MissionPartnerModalActionBar/MissionPartnerModalActionBar';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';

export const AddCustomTrainingItemModalContent = ({
  missionPartner,
  onClose,
  onSubmit
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<{ name: string; type: string }>({
    defaultValues: {
      name: '',
      type: ''
    }
  });
  const { isDuAdmin } = useGetSession();

  const typeOptions = [
    { value: '', label: 'Select a type' },
    { value: 'course', label: 'Manual course' },
    { value: 'scorm', label: 'SCORM uploaded course' },
    { value: 'exam', label: 'Assessment' },
    { value: 'survey', label: 'Survey' },
    ...(isDuAdmin ? [{ value: 'lab', label: 'Lab' }] : [])
  ];

  // Mutations
  const { createSurvey } = useCreateSurvey();
  const { createHostedExam } = useCreateHostedExam();
  const { createHostedCourse } = useCreateHostedCourse();
  const { createHostedScorm } = useCreateHostedScorm();
  const { createLab } = useCreateLab();

  const handleCreateNewItem = async ({ name, type }) => {
    if (type === 'survey') {
      return createSurvey({
        name,
        missionPartnerId: missionPartner.id,
        description: ''
      }).then(data => {
        onSubmit(type, data.data.createSurvey.id);
      });
    }

    if (type === 'exam') {
      return createHostedExam({
        name,
        missionPartnerId: missionPartner.id,
        description: ''
      }).then(data => {
        onSubmit(type, data.data.createHostedExam.id);
      });
    }

    if (type === 'course') {
      return createHostedCourse({
        name,
        missionPartnerId: missionPartner.id,
        description: ''
      }).then(data => {
        onSubmit(type, data.data.createHostedCourse.id);
      });
    }

    if (type === 'scorm') {
      return createHostedScorm({
        name,
        missionPartnerId: missionPartner.id,
        description: ''
      }).then(data => {
        onSubmit(type, data.data.createHostedScorm.id);
      });
    }

    if (type === 'lab') {
      return createLab({
        name,
        missionPartnerId: missionPartner.id
      }).then(data => {
        onSubmit(type, data.data.createLab.id);
      });
    }

    return false; // So that react-hook-forms knows things are not cool
  };

  return (
    <div className={vstack({ gap: '8' })}>
      <StandardModalHeader title="New training item" onClose={onClose} />
      <form
        className={vstack({ w: 'full', alignItems: 'flex-start', gap: '8' })}
        onSubmit={handleSubmit(handleCreateNewItem)}
      >
        <div className={vstack({ w: 'full', gap: '8' })}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'The item name is required.' }}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <TextInput
                {...field}
                className={css({ w: '31rem' })}
                label="Item name"
                errorMessage={error?.message}
                autoComplete="off"
                required // need it here because the browser component acts differently
              />
            )}
          />
          {/* reset the gap on vstack */}
          <div className={vstack({ w: 'full' })}>
            <Controller
              name="type"
              control={control}
              rules={{ required: 'An item type is required.' }}
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <FieldSelect
                  {...field}
                  label="Type"
                  options={typeOptions}
                  errorMessage={error?.message}
                  required
                />
              )}
            />
          </div>
        </div>
        <MissionPartnerModalActionBar
          onClose={onClose}
          actionText="Create training item"
          disabled={isSubmitting}
          loading={isSubmitting}
        />
      </form>
    </div>
  );
};
