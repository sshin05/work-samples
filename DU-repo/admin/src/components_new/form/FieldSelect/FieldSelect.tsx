import { Field, FieldMessage, Label, Option, Select } from '@cerberus/react';
import { buildDescribeByText } from '../internalUtils/buildDescribeByText';
import type { FieldSelectProps } from './FieldSelect.types';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';

export const FieldSelect = ({
  id,
  name,
  label,
  helpText,
  errorMessage,
  disabled,
  options,
  readOnly,
  required,
  invalid,
  labelSize,
  placeholder,
  ...props
}: FieldSelectProps) => {
  /** Derived Props */
  const derivedId = id || name;
  const derivedInvalid = Boolean(errorMessage) || invalid;

  const describedByText = buildDescribeByText(
    derivedId,
    helpText,
    errorMessage
  );

  return (
    <Field disabled={disabled} invalid={derivedInvalid} readOnly={readOnly}>
      <div
        className={vstack({
          gap: '0',
          alignItems: 'flex-start',
          w: 'full'
        })}
      >
        {Boolean(label) && (
          <div
            className={hstack({ w: 'full', justifyContent: 'space-between' })}
          >
            <Label htmlFor={derivedId} size={labelSize}>
              {label}
            </Label>
            {required && (
              <span
                className={css({
                  color: 'page.text.100',
                  textStyle: labelSize ? `label-${labelSize}` : 'label-lg'
                })}
              >
                (required)
              </span>
            )}
          </div>
        )}
        <Select
          {...props}
          id={derivedId}
          name={name}
          describedBy={describedByText}
          aria-invalid={derivedInvalid}
          data-invalid={derivedInvalid}
        >
          {placeholder && (
            <Option key={`${derivedId}-placeholder`} value="">
              {placeholder}
            </Option>
          )}
          {options.map(option => (
            // sometimes option.value is undefined i.e. { label: 'All', value: '' || undefined }
            <Option
              key={`${derivedId}-${option.value || option.label}`}
              value={option.value}
            >
              {option.label}
            </Option>
          ))}
        </Select>
        {Boolean(helpText) && !Boolean(errorMessage) && (
          <FieldMessage id={`help:${derivedId}`}>{helpText}</FieldMessage>
        )}

        {Boolean(errorMessage) && (
          <FieldMessage id={`error:${derivedId}`}>{errorMessage}</FieldMessage>
        )}
      </div>
    </Field>
  );
};
