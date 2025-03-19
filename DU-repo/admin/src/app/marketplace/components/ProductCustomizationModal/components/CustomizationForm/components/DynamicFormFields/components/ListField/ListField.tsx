import { Select, Option } from '@cerberus/react';
import type { CustomizationFieldProps } from '../FieldWrapper/FieldWrapper.types';
import type { ChangeEvent } from 'react';

export const ListField = ({
  field,
  fieldData
}: Omit<CustomizationFieldProps, 'fieldState'>) => {
  return (
    <Select
      id={fieldData.name}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        field.onChange(e);
      }}
      {...field}
    >
      <Option value="">Choose option</Option>
      {fieldData.listOptions?.map(option => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};
