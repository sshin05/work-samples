import { Input } from '@cerberus/react';
import type { CustomizationFieldProps } from '../FieldWrapper/FieldWrapper.types';
import { css } from '@cerberus/styled-system/css';

export const TimeField = ({ field, fieldData }: CustomizationFieldProps) => {
  return (
    <Input
      id={fieldData.name}
      placeholder={fieldData.fieldType}
      type="time"
      className={css({
        colorScheme: 'dark'
      })}
      {...field}
    />
  );
};
