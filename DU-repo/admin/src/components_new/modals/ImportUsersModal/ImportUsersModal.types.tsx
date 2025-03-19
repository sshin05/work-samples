export interface User {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface Props {
  error?: string | null;
  handleNewUser?: boolean;
  userNotFoundText?: string;
  onClose?: () => void;
  onAddMultipleUsers?: (file: File) => void;
  onAddSingleUser?: (user: User) => void;
  loading?: boolean;
  title?: string;
}
