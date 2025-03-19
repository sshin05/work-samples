import { Field, FieldMessage, Input, Label } from '@cerberus/react';
import { buildDescribeByText } from '../internalUtils/buildDescribeByText';
import type { TextInputProps } from './TextInput.types';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';

export const TextInput = ({
  id,
  name,
  label,
  helpText,
  errorMessage,
  disabled,
  readOnly,
  required,
  invalid,
  type = 'text',
  labelSize,
  maxLength,
  ...props
}: TextInputProps) => {
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
        <Input
          {...props}
          id={derivedId}
          name={name}
          type={type}
          describedBy={describedByText}
          maxLength={maxLength}
          aria-invalid={derivedInvalid}
          data-invalid={derivedInvalid}
        />
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
