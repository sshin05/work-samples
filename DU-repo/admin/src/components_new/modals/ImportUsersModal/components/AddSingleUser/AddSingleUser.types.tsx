export interface User {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export type AddSingleUserProps = {
  handleNewUser?: boolean;
  setHandleNewUser?: (value: boolean) => void;
  userNotFoundText?: string;
  error?: string;
  setSingleUser?: (user: User) => void;
  singleUser?: User;
};
