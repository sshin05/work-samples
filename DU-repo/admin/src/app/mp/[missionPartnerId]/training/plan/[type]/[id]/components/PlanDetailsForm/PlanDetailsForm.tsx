import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { css } from '@cerberus/styled-system/css';
import {
  Field,
  Button,
  useNotificationCenter,
  Spinner,
  Toggle
} from '@cerberus/react';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import MissionPartnerOwner from './MissionPartnerOwner';
import {
  handleUpdatePlanDetails,
  updateForceMultiplierHandler
} from '@/components/pages/manage-mission-partner/custom-training-plan/manage-mission-partner-custom-plan-page-utils';
import { useUnsavedChangesPrompt } from '@/hooks/useUnsavedChangesPrompt';
import {
  useFindLatestForceMultiplierByIdAdmin,
  useUpdateForceMultiplier,
  useUpdateForceMultiplierContent
} from '@/api/force-multipliers';
import { useFindAllMissionPartnersMinDetails } from '@/api/mission-partner';
import { FieldSelect, TextArea } from '@/components_new/form';

export const PlanDetailsForm = ({
  handleSubmit,
  control,
  isSubmitting,
  isDirty,
  forceMultiplierById,
  missionPartnerMinDetails,
  isModularizedForceMultiplier,
  supportsModules,
  isDuAdmin,
  disabled,
  loading
}) => {
  const { notify } = useNotificationCenter();
  const { updateForceMultiplier, updateForceMultiplierLoading } =
    useUpdateForceMultiplier();
  const { fetchForceMultiplierById, forceMultiplierByIdLoading } =
    useFindLatestForceMultiplierByIdAdmin();
  const { updateForceMultiplierContent, updateForceMultiplierContentLoading } =
    useUpdateForceMultiplierContent();

  const { missionPartnersMinDetails } = useFindAllMissionPartnersMinDetails();
  useUnsavedChangesPrompt(isDirty);

  const isFmPublished = forceMultiplierById?.status === 'Published';

  const missionPartnerOptions = [
    { value: '', label: 'None' },
    ...missionPartnersMinDetails.map(mp => ({
      value: mp.id,
      label: mp.name
    }))
  ];

  const handleClickToggleModules = useCallback(async () => {
    const input = !isModularizedForceMultiplier
      ? {
          id: forceMultiplierById.id,
          version: forceMultiplierById.version,
          modules: [
            {
              title: 'New Module',
              items: forceMultiplierById?.items.map(item => ({
                itemId: item.id
              }))
            }
          ]
        }
      : {
          id: forceMultiplierById.id,
          version: forceMultiplierById.version,
          modules: []
        };

    return updateForceMultiplierHandler(
      input,
      updateForceMultiplier,
      fetchForceMultiplierById,
      forceMultiplierById.id,
      notify
    );
  }, [
    forceMultiplierById,
    isModularizedForceMultiplier,
    updateForceMultiplier,
    fetchForceMultiplierById,
    notify
  ]);

  const handleUpdatePlan = useCallback(
    async planDetailData => {
      return handleUpdatePlanDetails(
        planDetailData,
        forceMultiplierById,
        updateForceMultiplier,
        updateForceMultiplierContent,
        fetchForceMultiplierById,
        notify
      );
    },
    [
      notify,
      updateForceMultiplier,
      fetchForceMultiplierById,
      updateForceMultiplierContent,
      forceMultiplierById
    ]
  );

  const visibilityOptions = [
    { value: '', label: 'Select a visibility' },
    { value: 'Everyone', label: 'Global' },
    { value: 'Air Force', label: 'Air Force' },
    { value: 'Space Force', label: 'Space Force' },
    { value: 'Private', label: 'Private' },
    {
      value: 'private-mission-partner-members-only',
      label: 'Private (Mission Partner Members Only)'
    }
  ];

  return (
    <form
      onSubmit={handleSubmit(handleUpdatePlan)}
      className={css({ w: 'full' })}
    >
      <div
        className={vstack({
          gap: 4,
          alignItems: 'flex-start',
          w: 'full',
          p: 6,
          borderRadius: 4,
          backgroundColor: 'page.surface.100'
        })}
      >
        <div
          className={hstack({
            gap: 2,
            alignItems: 'flex-start',
            w: 'full'
          })}
        >
          <p className={css({ textStyle: 'label-md' })}>Plan Type:</p>
          <p className={css({ textStyle: 'label-md' })}>Force Multiplier</p>
        </div>
        <div
          className={vstack({
            alignItems: 'flex-start',
            w: 'full'
          })}
        >
          <MissionPartnerOwner
            missionPartnerOptions={missionPartnerOptions}
            control={control}
            isDuAdmin={isDuAdmin}
            isFmPublished={isFmPublished}
            disabled={
              disabled ||
              updateForceMultiplierContentLoading ||
              updateForceMultiplierLoading
            }
            missionPartner={missionPartnerMinDetails}
          />
        </div>
        <div
          className={vstack({
            gap: 2,
            alignItems: 'flex-start',
            w: 'full'
          })}
        >
          <p className={css({ textStyle: 'label-sm' })}>
            Plan items must be completed in order
          </p>
          <Controller
            name="unsequenced"
            control={control}
            defaultValue={false}
            disabled={
              updateForceMultiplierContentLoading ||
              loading ||
              updateForceMultiplierLoading
            }
            render={({ field: { ref, ...field } }) => (
              <Field {...field}>
                <Toggle
                  onChange={field.onChange}
                  checked={field.value}
                  value={field.value}
                  id="unsequenced"
                  name="unsequenced"
                />
              </Field>
            )}
          />
        </div>
        {supportsModules && (
          <div
            className={vstack({
              gap: 2,
              alignItems: 'flex-start',
              w: 'full'
            })}
          >
            <p className={css({ textStyle: 'label-sm' })}>
              My plan has modules
            </p>

            <div
              className={hstack({
                gap: 4,
                alignItems: 'center',
                w: 'full'
              })}
            >
              <Field
                disabled={
                  disabled ||
                  isFmPublished ||
                  updateForceMultiplierContentLoading ||
                  updateForceMultiplierLoading ||
                  forceMultiplierByIdLoading
                }
              >
                <Toggle
                  id="modules"
                  name="modules"
                  value={isModularizedForceMultiplier}
                  checked={isModularizedForceMultiplier}
                  onChange={handleClickToggleModules}
                />
              </Field>
              {(updateForceMultiplierLoading || forceMultiplierByIdLoading) && (
                <Spinner size="1em" />
              )}
            </div>
          </div>
        )}
        <Controller
          name="visibility"
          control={control}
          rules={{
            required: 'A visibility value is required.'
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <div
              className={vstack({
                gap: 0,
                alignItems: 'flex-start',
                maxWidth: '1/2'
              })}
            >
              <FieldSelect
                {...field}
                label="Visibility"
                size="md"
                options={visibilityOptions}
                errorMessage={error?.message}
                required
                disabled={
                  loading ||
                  disabled ||
                  isFmPublished ||
                  updateForceMultiplierContentLoading ||
                  updateForceMultiplierLoading
                }
              />

              {field.value === 'Everyone' && (
                <p className={css({ textStyle: 'label-sm' })}>
                  All learners can see this plan
                </p>
              )}
              {field.value === 'Air Force' && (
                <p className={css({ textStyle: 'label-sm' })}>
                  All Air Force learners can see this plan
                </p>
              )}
              {field.value === 'Space Force' && (
                <p className={css({ textStyle: 'label-sm' })}>
                  All Space Force learners can see this plan
                </p>
              )}
              {field.value === 'Private' && (
                <p className={css({ textStyle: 'label-sm' })}>
                  Only learners you assign this plan to can see this plan
                </p>
              )}
              {field.value === 'private-mission-partner-members-only' && (
                <p className={css({ textStyle: 'label-sm' })}>
                  Only learners who are members of the mission partner can see
                  this plan (through the programs page for example)
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="summary"
          control={control}
          rules={{
            required: 'The summary is required.',
            maxLength: {
              value: 500,
              message: 'The summary must be less than 500 characters.'
            }
          }}
          disabled={
            loading ||
            disabled ||
            isFmPublished ||
            updateForceMultiplierContentLoading ||
            updateForceMultiplierLoading
          }
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <div
              className={
                (vstack({
                  alignItems: 'flex-start'
                }),
                css({ w: '40%' }))
              }
            >
              <TextArea
                {...field}
                label="Plan Summary"
                errorMessage={error?.message}
                rows={8}
                inputLength={field.value?.length || 0}
                maxLength={500}
                required
              />
            </div>
          )}
        />
        <Button
          disabled={isFmPublished || isSubmitting}
          palette="action"
          shape="rounded"
          usage="filled"
          type="submit"
          className={css({ w: 'auto' })}
        >
          Save
        </Button>
      </div>
    </form>
  );
};
