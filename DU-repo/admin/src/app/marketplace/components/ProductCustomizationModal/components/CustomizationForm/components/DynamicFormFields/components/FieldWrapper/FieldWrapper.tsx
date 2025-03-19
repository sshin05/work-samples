import { Field, FieldMessage, Label } from '@cerberus/react';
import type { FieldWrapperProps } from './FieldWrapper.types';

export const FieldWrapper = ({
  fieldState,
  fieldData,
  children
}: FieldWrapperProps) => {
  return (
    <Field required={Boolean(fieldData.requiredToSubmit)} {...fieldState}>
      <Label htmlFor={fieldData.name}>{fieldData.name}</Label>
      {children}
      <FieldMessage id={'help:' + fieldData.name}>
        {fieldData.description}
      </FieldMessage>
    </Field>
  );
};
