import {
  FieldMessage,
  Label,
  Textarea as CerberusTextArea,
  Field
} from '@cerberus/react';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import type { TextAreaProps } from './TextArea.types';
import { css } from '@cerberus/styled-system/css';

export const TextArea = ({
  label,
  helpText,
  name,
  errorMessage,
  id,
  inputLength,
  maxLength,
  disabled,
  readOnly,
  required,
  invalid,
  labelSize,
  ...props
}: TextAreaProps) => {
  /** Derived Props */
  const derivedId = id || name;
  const derivedInvalid = Boolean(errorMessage) || invalid;

  // TODO?
  // const describedByText = buildDescribeByText(
  //   derivedId,
  //   helpText,
  //   errorMessage
  // );

  return (
    <Field disabled={disabled} invalid={derivedInvalid} readOnly={readOnly}>
      <div
        className={vstack({
          gap: '0.5',
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
        <CerberusTextArea
          {...props}
          id={derivedId}
          aria-invalid={derivedInvalid}
          data-invalid={derivedInvalid}
        />
        <div
          className={hstack({
            w: 'full',
            justifyContent: 'space-between'
          })}
        >
          <div
            className={vstack({
              gap: '5',
              maxW: '28rem',
              textWrap: 'wrap'
            })}
          >
            {Boolean(helpText) && !Boolean(errorMessage) && (
              <FieldMessage id={`help:${derivedId}`}>{helpText}</FieldMessage>
            )}
            {Boolean(errorMessage) && (
              <FieldMessage id={`error:${derivedId}`}>
                {errorMessage}
              </FieldMessage>
            )}
          </div>
          {Boolean(maxLength) && (
            <FieldMessage
              id={`error:${derivedId}`}
              className={css({
                color: 'page.text.100'
              })}
            >
              {`${inputLength || 0}/${maxLength}`}
            </FieldMessage>
          )}
        </div>
      </div>
    </Field>
  );
};
