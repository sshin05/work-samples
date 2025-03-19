import type { FindUsersBySearchTextQuery } from '@/api/codegen/graphql';
import type { Control, FieldValues } from 'react-hook-form';

export type User =
  FindUsersBySearchTextQuery['findUsersBySearchText']['records'][number];

export interface UserSearchInputProps {
  onExistingUserSelect: (user: User) => void;
  onCreateNewUser: () => void;
  formControl: Control<FieldValues, any>;
  onInputChange: (searchValue: string) => void;
  userInputSearchValue: string | null;
}
