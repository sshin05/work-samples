import React from 'react';
import { Controller } from 'react-hook-form';
import { vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { FieldSelect } from '@/components_new/form';

const MissionPartnerOwner = ({
  isDuAdmin,
  control,
  missionPartnerOptions,
  isFmPublished,
  disabled,
  missionPartner
}) => {
  if (isDuAdmin) {
    return (
      <Controller
        name="missionPartnerId"
        control={control}
        rules={{
          required: 'An owner is required.'
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <div
            className={vstack({
              gap: 0,
              alignItems: 'flex-start',
              maxWidth: '40%'
            })}
          >
            <FieldSelect
              {...field}
              label="Owner"
              size="md"
              options={missionPartnerOptions}
              disabled={disabled || isFmPublished}
              errorMessage={error?.message}
              required
            />
          </div>
        )}
      />
    );
  }

  return (
    <>
      <p className={css({ textStyle: 'body-md' })}>{missionPartner?.name}</p>
    </>
  );
};

export default MissionPartnerOwner;
