import { Field, FieldMessage, Label, Show } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import type { ReactNode } from 'react';

import type { ControllerFieldState } from 'react-hook-form';

type FormFieldWrapperProps = {
  fieldState?: ControllerFieldState;
  fieldName: string;
  fieldDescription?: string;
  isRequired?: boolean;
  showOptionalTag?: boolean;
  children: ReactNode;
};

export const FormFieldWrapper = ({
  fieldState,
  fieldName,
  fieldDescription,
  isRequired,
  showOptionalTag,
  children
}: FormFieldWrapperProps) => {
  return (
    <Field {...fieldState} required={isRequired}>
      <div className={flex({ alignItems: 'center' })}>
        <Label htmlFor={fieldName}>{fieldName}</Label>

        <Show when={!isRequired && showOptionalTag}>
          <span
            className={css({ textStyle: 'label-sm', color: 'page.text.100' })}
          >
            (optional)
          </span>
        </Show>
      </div>

      {children}
      {fieldDescription && (
        <FieldMessage id={'help:' + fieldName}>{fieldDescription}</FieldMessage>
      )}
      {fieldState?.error?.message && (
        <FieldMessage id="help:error">{fieldState.error?.message}</FieldMessage>
      )}
    </Field>
  );
};
