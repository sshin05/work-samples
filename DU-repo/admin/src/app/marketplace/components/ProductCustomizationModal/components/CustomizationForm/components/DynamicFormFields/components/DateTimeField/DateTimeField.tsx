import { Input } from '@cerberus/react';
import type { CustomizationFieldProps } from '../FieldWrapper/FieldWrapper.types';
import { css } from '@cerberus/styled-system/css';

export const DateTimeField = ({
  field,
  fieldData
}: CustomizationFieldProps) => {
  return (
    <Input
      type="datetime-local"
      id={fieldData.name}
      min={fieldData.minimumDate || ''}
      className={css({
        colorScheme: 'dark'
      })}
      {...field}
    />
  );
};
