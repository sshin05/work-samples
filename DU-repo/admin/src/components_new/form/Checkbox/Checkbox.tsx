// See [Cerberus CheckBox docs](https://cerberus.digitalu.design/react/checkbox)
import { useEffect } from 'react';
import { Field, Label, Checkbox as CerberusCheckbox } from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = (props: CheckboxProps) => {
  const {
    name,
    id,
    labelText,
    labelSize = 'md',
    size = 'md',
    disabled,
    readOnly,
    required,
    invalid,
    errorMessage,
    value,
    onChange,
    ...rest
  } = props;
  const derivedId = id || name;
  const derivedInvalid = Boolean(errorMessage) || invalid;

  // This is temporary!
  // useRef can't be used because `ref` isn't wired into cerberusCheckboxes.
  // This is workaround number 2:
  useEffect(() => {
    const domEl = document.getElementById(derivedId) as HTMLInputElement | null;
    if (domEl) {
      domEl.checked = value;
    }
  }, [value, derivedId]);

  return (
    <Field
      disabled={disabled}
      invalid={derivedInvalid}
      readOnly={readOnly}
      required={required}
    >
      <Label
        className={hstack({
          justify: 'flex-start',
          gap: 0
        })}
        htmlFor={derivedId}
        size={labelSize}
      >
        <CerberusCheckbox
          id={derivedId}
          size={size}
          onChange={onChange}
          checked={value}
          {...rest}
        />
        {labelText}
      </Label>
    </Field>
  );
};

Checkbox.displayName = 'Checkbox';
