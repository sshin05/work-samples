import type {
  CheckboxProps as CerberusCheckboxProps,
  FieldContextValue
} from '@cerberus/react';
import { type LabelVariant } from '@cerberus/styled-system/recipes';

/**
 * A checkbox wrapped inside a label. The label and checkbox are
 * associated explicitly by `props.id`.
 *
 * @param {Props} props - Props for the component.
 * @param {string} props.labelText - Text for the label.
 * @param {LabelVariant['size']} [props.labelSize='md'] - The size of the label; defaults to 'md'.
 * @param {CheckboxProps['size']} [props.size='md'] - The size of the checkbox; defaults to 'md'.
 * @param {FieldContextValue} [props.field] - Field context.
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <Checkbox
 *   onChange={() => {
 *     setIsChecked(prevState => !prevState)
 *   }}
 *   checked={isChecked}
 *   id="terms-checkbox"
 *   labelText="Accept Terms and Conditions"
 *   size="md"
 *   labelSize="sm"
 * />
 * ```
 */

/**
 * Props for the BaseCheckbox component.
 */
export type CheckboxProps = Omit<
  CerberusCheckboxProps,
  'id' | 'checked' | 'defaultChecked' | 'value' | 'ref'
> & {
  /**
   * The unique identifier for the checkbox field.
   * Will be in sync with `id` for accessibility.
   */
  name: string;

  /**
   * @deprecated
   * AVOID USING THIS; `id` attribute is NOT NECESSARY
   * - `id` defaults to `name` if not provided.
   */
  id?: string;

  /**
   * Text for the checkbox label.
   */
  labelText?: string;

  /**
   * Current boolean value of the checkbox.
   */
  value?: boolean;

  /**
   * The size of the label; defaults to 'md'.
   */
  labelSize?: LabelVariant['size'];

  /** Error message to be shown when the field is invalid. Also sets `invalid` to `true` on the `Field` component, triggering error styling. */
  errorMessage?: string;

  /**
   * The size of the checkbox; defaults to 'md'.
   */
  size?: CerberusCheckboxProps['size'];

  /** Sets the input field to a disabled state, preventing user interaction. */
  disabled?: FieldContextValue['disabled'];

  /** Makes the input field read-only, allowing focus and copying but preventing edits. */
  readOnly?: FieldContextValue['readOnly'];

  /** Adds a required attribute to the input field. Note: this triggers native browser validation, which might override custom error handling. */
  required?: FieldContextValue['required'];

  /** AVOID USING THIS -- This property is derived from !!errorMessage */
  invalid?: FieldContextValue['invalid'];
};
