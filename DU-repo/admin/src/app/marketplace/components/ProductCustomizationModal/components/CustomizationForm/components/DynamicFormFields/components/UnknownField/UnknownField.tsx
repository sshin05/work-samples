import { Input } from '@cerberus/react';
import type { CustomizationFieldProps } from '../FieldWrapper/FieldWrapper.types';

export const UnknownField = ({ field, fieldData }: CustomizationFieldProps) => {
  return (
    <Input
      id={fieldData.name}
      placeholder={'UNKNOWN: ' + fieldData.fieldType}
      type="text"
      {...field}
    />
  );
};
