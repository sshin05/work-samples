import type { ButtonVariant } from '@cerberus/styled-system/recipes';

/**
 * A Cerberus confirm modal.
 *
 * @typedef {Object} TextInputProps
 * @returns {JSX.Element} A button that, when clicked, displays a Cerberus confirm modal.
 */
export type ConfirmActionModalProps = {
  /**The heading text for the modal. */
  heading: string;

  /** The description content for the modal. Can be string or element (ex: link in the description). */
  description: React.ReactNode;

  /** The text for the action button. */
  actionText: string;

  /**  The text for the cancel button. */
  cancelText: string;

  /** The function to handle the submit action. */
  handleSubmit: () => Promise<void> | void;

  /** Optional function to handle closing the modal. */
  onClose?: () => void;

  /** The content for the button. */
  buttonContent: React.ReactNode;

  /** Optional flag to disable the button. */
  disabled?: boolean;

  /** Optional flag to set the button variant. */
  usage?: ButtonVariant['usage'];
};
