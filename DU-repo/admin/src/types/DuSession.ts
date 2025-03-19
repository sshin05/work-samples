import type { Session } from 'next-auth';

export type DuSession = Session & {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    roles: string[];
  };
  accessToken?: string;
  error?: {
    message: string;
  };
  idToken?: string;
  issuer?: string;
};
