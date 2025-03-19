import { Input } from '@cerberus/react';
import type { CustomizationFieldProps } from '../FieldWrapper/FieldWrapper.types';

export const TextField = ({ field, fieldData }: CustomizationFieldProps) => {
  return <Input id={fieldData.name} type="text" {...field} />;
};
