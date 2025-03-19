import { Textarea } from '@cerberus/react';
import type { CustomizationFieldProps } from '../FieldWrapper/FieldWrapper.types';

export const LongTextField = ({
  field,
  fieldData
}: CustomizationFieldProps) => {
  return (
    <div aria-describedBy={'help:' + fieldData.name}>
      <Textarea id={fieldData.name} {...field} />
    </div>
  );
};
