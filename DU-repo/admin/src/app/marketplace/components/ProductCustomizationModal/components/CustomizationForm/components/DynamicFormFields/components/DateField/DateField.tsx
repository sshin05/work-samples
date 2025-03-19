import { css } from '@cerberus/styled-system/css';
import { Input } from '@cerberus/react';
import type { CustomizationFieldProps } from '../FieldWrapper/FieldWrapper.types';

export const DateField = ({ field, fieldData }: CustomizationFieldProps) => {
  return (
    <Input
      type="date"
      id={fieldData.name}
      min={fieldData.minimumDate || ''}
      className={css({
        colorScheme: 'dark',
        maxW: '50%'
      })}
      {...field}
    />
  );
};
