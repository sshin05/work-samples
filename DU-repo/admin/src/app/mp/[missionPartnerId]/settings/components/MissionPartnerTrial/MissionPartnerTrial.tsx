import { useState, useEffect } from 'react';
import {
  Button,
  Field,
  Toggle,
  useToggle,
  useNotificationCenter,
  Label,
  FieldMessage
} from '@cerberus/react';
import { TextInput } from '@/components_new/form';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import { Controller, useForm } from 'react-hook-form';
import { formatDateLocaleString } from '@/utils/date/formatDateLocaleString';
import {
  formatTrialDates,
  getIsValidEndDate,
  getIsValidStartDate,
  isValidTrialDates
} from '@/components/manage-mission-partners/utils/validateTrialDates';
import { css, cx } from '@cerberus/styled-system/css';
import { useToggleMissionPartnerTrial } from '@/api/mission-partner';
import { useRouter } from 'next/navigation';
import { containerStyles } from '@/app/styles/ContainerStyles';

export const MissionPartnerTrial = ({ missionPartner, disabled }) => {
  const [trialOn, setTrialOn] = useState(Boolean(missionPartner?.trialEnabled));
  const { handleChange } = useToggle();
  const { notify } = useNotificationCenter();
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();
  const { toggleMissionPartnerTrial } = useToggleMissionPartnerTrial();
  const router = useRouter();

  useEffect(() => {
    if (
      missionPartner?.trialStartDate !== null &&
      missionPartner?.trialEndDate !== null
    ) {
      setValue(
        'trialStart',
        formatDateLocaleString(missionPartner.trialStartDate)
      );
      setValue('trialEnd', formatDateLocaleString(missionPartner.trialEndDate));
    }
  }, [missionPartner?.trialStartDate, missionPartner?.trialEndDate, setValue]);

  const handleUpdateTrialEnabled = async (status: boolean) => {
    setTrialOn(status);
    setValue('trialEnabled', status);

    // if the trial toggle is turned off, then update the mission partner to not have a trial
    if (!status) {
      try {
        await toggleMissionPartnerTrial(missionPartner.id, status);

        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Trial was turned off for the mission partner.'
        });
        router.refresh();
      } catch {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error updating mission partner.'
        });
      }
    }
  };

  const handleSubmitMissionPartnerTrial = async data => {
    try {
      if (trialOn) {
        const { formattedStartDate, formattedEndDate } = formatTrialDates(
          data.trialStart,
          data.trialEnd
        );

        await toggleMissionPartnerTrial(
          missionPartner.id,
          trialOn,
          formattedStartDate || new Date(missionPartner?.trialStartDate),
          formattedEndDate || new Date(missionPartner?.trialEndDate)
        );

        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Your changes have been saved.'
        });
      }
    } catch {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error updating mission partner.'
      });
    }
  };

  if (!missionPartner) return null;

  return (
    <form onSubmit={handleSubmit(handleSubmitMissionPartnerTrial)}>
      <div
        className={cx(
          vstack({
            gap: '2',
            alignItems: 'flex-start',
            p: '6'
          }),
          containerStyles
        )}
      >
        <div
          className={vstack({
            gap: '4',
            alignItems: 'flex-start'
          })}
        >
          <h2 className={css({ textStyle: 'heading-xs' })}>Trial Phase</h2>
          <Controller
            name="trialEnabled"
            control={control}
            disabled={disabled}
            render={({ field: { ref, ...field } }) => {
              return (
                <Field
                  disabled={field.disabled}
                  invalid={false}
                  required={false}
                >
                  <div
                    className={vstack({
                      alignItems: 'flex-start',
                      gap: '2'
                    })}
                  >
                    <Label htmlFor="trialEnabled">
                      Allow Mission partners to try out DU
                    </Label>
                    <div className={hstack({ gap: '3' })}>
                      <Toggle
                        {...field}
                        checked={trialOn}
                        value={String(missionPartner?.trialEnabled)}
                        onChange={e => {
                          handleUpdateTrialEnabled(e.target.checked);
                          handleChange(e);
                        }}
                        id="trialEnabled"
                      />
                      <FieldMessage id="help:trialEnabled">
                        {trialOn ? 'On' : 'Off'}
                      </FieldMessage>
                    </div>
                  </div>
                </Field>
              );
            }}
          />
        </div>
        {trialOn && (
          <div
            className={vstack({
              w: 'fit-content',
              alignItems: 'flex-start',
              gap: '8',
              mt: '4'
            })}
          >
            <div
              className={hstack({
                gap: '2'
              })}
            >
              <Controller
                name="trialStart"
                control={control}
                rules={{
                  required: 'Start Date is required',
                  validate: value => {
                    if (!isValidTrialDates(value, getValues('trialEnd'))) {
                      return 'invalid trial date';
                    }
                    if (!getIsValidStartDate(value)) {
                      return 'trial start date error';
                    }
                    return true;
                  }
                }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => {
                  return (
                    <TextInput
                      {...field}
                      label="Start Date"
                      placeholder="DD/MM/YYYY"
                      errorMessage={error?.message}
                      required
                    />
                  );
                }}
              />
              <Controller
                name="trialEnd"
                control={control}
                rules={{
                  required: 'End Date is required',
                  validate: value => {
                    if (!isValidTrialDates(getValues('trialStart'), value))
                      return 'invalid trial date';
                    if (!getIsValidEndDate(value)) {
                      return 'trial end date error';
                    }
                    return true;
                  }
                }}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => {
                  return (
                    <TextInput
                      {...field}
                      label="End Date"
                      errorMessage={error?.message}
                      placeholder="DD/MM/YYYY"
                      required
                    />
                  );
                }}
              />
            </div>
            <Button
              type="submit"
              palette="action"
              shape="rounded"
              usage="outlined"
              size="md"
              disabled={isSubmitting}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};
