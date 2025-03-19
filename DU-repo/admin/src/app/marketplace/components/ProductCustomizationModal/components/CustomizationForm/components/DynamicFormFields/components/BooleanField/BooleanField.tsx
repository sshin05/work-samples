import { Toggle, useToggle } from '@cerberus/react';
import type { CustomizationFieldProps } from '../FieldWrapper/FieldWrapper.types';
import type { ChangeEvent } from 'react';

export const BooleanField = ({
  field
}: Omit<CustomizationFieldProps, 'fieldData' | 'fieldState'>) => {
  const { checked, handleChange } = useToggle({
    checked: field.value === '' || field.value === 'true' ? 'default' : 'false'
  });

  return (
    <Toggle
      checked={checked === 'default'}
      id={field.name}
      data-testid={field.name} // eslint-disable-line local-rules/no-test-ids
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        field.onChange(e);
      }}
      value="default"
    />
  );
};
