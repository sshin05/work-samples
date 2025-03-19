import type { FieldContextValue, InputProps } from '@cerberus/react';
import { type CSSProperties } from 'react';

/**
 * A Cerberus Input component specifically designed for text inputs. It can be customized for different text input types like `password`, `email`, etc.
 * Note: Cerberus inputs do not accept React `ref`.
 *
 * ### Usage Example with react-hook-form
 * @example
 * <Controller
 *   name="title"
 *   control={control}
 *   rules={{ required: 'The title is required.' }} // CURRENTLY THIS DOES NOT EVER DISPLAY; BROWSER TAKES OVER when <TextInput required /> is used.
 *   render={({ field: { ref: _ref, ...field }, fieldState: { error } }) => (
 *     <TextInput
 *       {...field}
 *       label="Example Label"
 *       required
 *       errorMessage={error?.message}
 *     />
 *   )}
 * />
 *
 * @typedef {Object} TextInputProps
 * @returns {JSX.Element} A rendered Cerberus text input component.
 */
export type TextInputProps = Omit<InputProps, 'id'> & {
  /** The unique identifier for the input field. Should be in sync with `id` for accessibility. */
  name: string;

  /** Label text displayed for the input. */
  label?: string;

  /** Size of the label. */
  labelSize?: 'sm' | 'md';

  /** * @deprecated
   *  AVOID USING THIS; `id` attribute is NOT NECESSARY - `id` Defaults to `name` if not provided. */
  id?: string;

  /** Supplementary help text displayed under the input for additional context. Element if a custom description is desired. */
  helpText?: string | React.ReactNode;

  /** Error message to be shown when the field is invalid. Also sets `invalid` to `true` on the `Field` component, triggering error styling. */
  errorMessage?: string;

  /** Sets the input field to a disabled state, preventing user interaction. */
  disabled?: FieldContextValue['disabled'];

  /** Makes the input field read-only, allowing focus and copying but preventing edits. */
  readOnly?: FieldContextValue['readOnly'];

  /** Adds a required attribute to the input field. Note: this triggers native browser validation, which might override custom error handling. */
  required?: FieldContextValue['required'];

  /** AVOID USING THIS -- This property is derived from !!errorMessage */
  invalid?: FieldContextValue['invalid'];

  /** Sets input type, like 'number'. Defaults to 'text'. */
  type?: string;

  /** Custom styles for the input field. */
  sx?: CSSProperties;

  /** Sets the maximum length of the input field. */
  maxLength?: number;
};
