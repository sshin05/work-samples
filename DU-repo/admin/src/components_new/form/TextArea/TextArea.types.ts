import type { FieldContextValue, TextareaProps } from '@cerberus/react';

/**
 * A Cerberus Textarea component specifically.
 * Note: Cerberus form elements do not accept React `ref`.
 *
 * ### Usage Example with react-hook-form
 * @example
 * <Controller
 *   name="description"
 *   control={control}
 *   rules={{ required: 'The description is required.' }} // CURRENTLY required rules DO NOT EVER DISPLAY; BROWSER TAKES OVER when <TextArea required /> is used.
 *   render={({ field: { ref: _ref, ...field }, fieldState: { error } }) => (
 *     <TextArea
 *       {...field}
 *       label="Example Label"
 *       required
 *       errorMessage={error?.message}
 *     />
 *   )}
 * />
 *
 * @typedef {Object} TextareaProps
 * @returns {JSX.Element} A rendered Cerberus textarea component.
 */
export type TextAreaProps = Omit<TextareaProps, 'id'> &
  MaxLengthProps & {
    /** The unique identifier for the textArea. Should be in sync with `id` for accessibility. */
    name: string;

    /** Label text displayed for the textArea. */
    label: string;

    /** Size of the label. */
    labelSize?: 'sm' | 'md';

    /** * @deprecated
     *  AVOID USING THIS; `id` attribute is NOT NECESSARY - `id` Defaults to `name` if not provided. */
    id?: string;

    /** Supplementary help text displayed under the textArea for additional context. */
    helpText?: string;

    /** Error message to be shown when the field is invalid. Also sets `invalid` to `true` on the `Field` component, triggering error styling. */
    errorMessage?: string;

    /** Sets the textArea field to a disabled state, preventing user interaction. */
    disabled?: FieldContextValue['disabled'];

    /** Makes the textArea field read-only, allowing focus and copying but preventing edits. */
    readOnly?: FieldContextValue['readOnly'];

    /** Adds a required attribute to the textArea field. Note: this triggers native browser validation, which might override custom error handling. */
    required?: FieldContextValue['required'];

    /** * @deprecated
     * AVOID USING THIS -- This property is derived from !!errorMessage */
    invalid?: FieldContextValue['invalid'];
  };

// require that if maxLength is provided, then inputLength must also be provided
type MaxLengthProps =
  | {
      /** maxLength: The maximum number of characters allowed in the textArea.*/
      maxLength?: never;
      /** inputLength: The current length of the input. Usually field.value.length . */
      inputLength?: never;
    }
  | {
      /** maxLength: The maximum number of characters allowed in the textArea.  */
      maxLength: number;
      /** inputLength: The current length of the input. Usually field.value.length . */
      inputLength: number;
    };
