import { Button } from '@cerberus/react';
import { TextInput, TextArea } from '@/components_new/form';
import { css } from '@cerberus/styled-system/css';
import { vstack } from '@cerberus/styled-system/patterns';
import { Controller } from 'react-hook-form';

export const AboutSection = ({
  forceMultiplierTitle,
  missionPartnerName,
  marketingControl,
  disabled,
  isMarketingSubmitting,
  isSubmitting
}) => {
  return (
    <div
      className={vstack({
        gap: 4,
        w: '1/2',
        p: 4,
        borderRadius: '2rem',
        alignItems: 'flex-start'
      })}
    >
      <Controller
        name="description"
        control={marketingControl}
        rules={{
          maxLength: {
            value: 250,
            message: 'The hero section text must be less than 250 characters.'
          }
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <div className={css({ w: 'full' })}>
            <TextArea
              {...field}
              label="Hero Section Text"
              inputLength={field.value?.length || 0}
              maxLength={250}
              errorMessage={error?.message}
              rows={8}
            />
          </div>
        )}
      />

      <Controller
        name="aboutTitle"
        control={marketingControl}
        rules={{
          required: 'The about section title is required.',
          maxLength: {
            value: 100,
            message: 'The about section title must be less than 100 characters.'
          }
        }}
        defaultValue={`About ${forceMultiplierTitle}`}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <div className={css({ w: 'full' })}>
            <TextInput
              {...field}
              label="About Section Title"
              errorMessage={error?.message}
              required
            />
          </div>
        )}
      />

      <Controller
        name="aboutDescription"
        control={marketingControl}
        rules={{
          maxLength: {
            value: 750,
            message: 'The about section must be less than 750 characters'
          },
          required: 'The about section text is required.'
        }}
        defaultValue={`This plan is provided by ${missionPartnerName}.`}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <div className={css({ w: 'full' })}>
            <TextArea
              {...field}
              label="About Section Text"
              inputLength={field.value?.length || 0}
              maxLength={500}
              errorMessage={error?.message}
              rows={8}
              required
            />
          </div>
        )}
      />
      <Button
        disabled={disabled || isMarketingSubmitting || isSubmitting}
        shape="rounded"
        palette="action"
        usage="filled"
        type="submit"
      >
        Save
      </Button>
    </div>
  );
};
