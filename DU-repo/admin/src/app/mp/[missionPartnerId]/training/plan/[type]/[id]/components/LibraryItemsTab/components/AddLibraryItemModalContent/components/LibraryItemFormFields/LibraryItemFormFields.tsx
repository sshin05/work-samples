import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Select, Option, Label, Field } from '@cerberus/react';
import { TextInput } from '@/components_new/form';
import { Controller } from 'react-hook-form';
import { css } from '@cerberus/styled-system/css';

const DISPLAY_NAME_MAX_LENGTH = 60;

export const LibraryItemFormFields = ({
  control,
  disabled,
  loading,
  activeUploadTab,
  hideType = false
}) => {
  return (
    <>
      <div
        className={vstack({ w: 'full', minW: '96', alignItems: 'flex-start' })}
      >
        <Controller
          name="displayName"
          control={control}
          rules={{ required: 'The display name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              className={css({ w: '31rem' })}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label="Display name"
              disabled={disabled || loading}
              errorMessage={error?.message}
              maxLength={DISPLAY_NAME_MAX_LENGTH}
              required
            />
          )}
        />
        <p className={css({ textStyle: 'label-sm' })}>
          User-friendly name that will appear to learners
        </p>
      </div>
      {!hideType && (
        <div
          className={vstack({
            w: 'full',
            minW: '96',
            alignItems: 'flex-start'
          })}
        >
          <Controller
            name="type"
            control={control}
            rules={{
              required: 'The type of item is required'
            }}
            render={({ field }) => (
              <div className={hstack()}>
                <div className={css({ w: '31rem', minW: '96', gap: 0 })}>
                  <Field required disabled={disabled || loading}>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      className={css({ w: 'full' })}
                      name={field.name}
                      id="type"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      disabled={disabled || loading}
                    >
                      <Option value="" disabled hidden>
                        Select a type
                      </Option>
                      {activeUploadTab === 0 && (
                        <Option value="File">File</Option>
                      )}
                      {activeUploadTab === 1 && (
                        <Option value="Link">Link</Option>
                      )}
                      <Option value="Video">Video</Option>
                      <Option value="Audio">Audio</Option>
                    </Select>
                  </Field>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </>
  );
};
