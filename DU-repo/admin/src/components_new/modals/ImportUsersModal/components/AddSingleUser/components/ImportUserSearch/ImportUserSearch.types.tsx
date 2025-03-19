import type { Control } from 'react-hook-form';

export interface User {
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface UserSearch {
  newResults: User[];
  input: string;
  showWarn: boolean;
}

export interface ImportUserSearchProps {
  setUserSearch: (userSearch: UserSearch) => void;
  clearErrors: () => void;
  helperText: () => string;
  email: string | null;
  error: string | null;
  formControl?: Control<{ email: string; firstName: string; lastName: string }>;
  customPlaceholder?: string;
  waitForAt?: boolean;
}
