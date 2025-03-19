/**
 * An input element for performing a user search.
 *
 * @typedef {Object} UserSearchProps
 * @returns {JSX.Element} A rendered UserSearch input component.
 */
export type UserSearchProps = {
  /** Function to run on change search */
  setUser: (user: any) => void;

  /** Label text displayed as info for the input. Element if a custom description is desired */
  helperText: React.ReactNode;

  /** Error text for when user is not found */
  error: string | null;

  /** Placeholder text displayed for for the input */
  customPlaceholder?: string;

  /** Boolean (default false) to determine whether or not to debounce the search */
  waitForAt?: boolean;

  /** Boolean (default false) to control whether user is permitted to user change this input */
  disabled?: boolean;

  /** Label text displayed for the input */
  styledLabelText?: string;

  /** Boolean (default false) to determine if input is required */
  required?: boolean;
};
