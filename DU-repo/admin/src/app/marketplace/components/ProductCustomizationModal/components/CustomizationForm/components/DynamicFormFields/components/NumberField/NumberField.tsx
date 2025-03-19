import { Input } from '@cerberus/react';
import type { CustomizationFieldProps } from '../FieldWrapper/FieldWrapper.types';

export const NumberField = ({ field, fieldData }: CustomizationFieldProps) => {
  return (
    <Input
      id={fieldData.name}
      type="number"
      min={fieldData.min}
      max={fieldData.max}
      {...field}
    />
  );
};
