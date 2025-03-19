import { useSession, signOut } from 'next-auth/react';
import type { DuSession } from '@/types/DuSession';

export const getIsDuAdmin = (session: DuSession): boolean | undefined => {
  if (!session || !session.user || !session.user.roles) {
    return false;
  }
  return session.user.roles.includes('admin');
};

export const getUserRoles = (session: DuSession) => {
  if (!session || !session.user || !session.user.roles) {
    return {
      isDuAdmin: false,
      isAfAdmin: false,
      isSfAdmin: false
    };
  }
  const isDuAdmin = Boolean(session.user?.roles?.includes('admin'));
  const isAfAdmin = Boolean(session.user?.roles?.includes('af-admin'));
  const isSfAdmin = Boolean(session.user?.roles?.includes('sf-admin'));
  return {
    isDuAdmin,
    isAfAdmin,
    isSfAdmin
  };
};

export const useIsDuAdmin = () => {
  const { data: session } = useSession();
  return {
    isDuAdmin: getIsDuAdmin(session as DuSession),
    session
  };
};

export const useUserRoles = () => {
  const { data: session } = useSession();
  return {
    ...getUserRoles(session as DuSession),
    session
  };
};

export const useSignOut = () => {
  const { data: session } = useSession();

  return {
    signOut: async () => {
      const { idToken, issuer } = session as DuSession;

      // Build the Keycloak logout URL
      // There is a temporary scenario where sessions created before this code is deployed will not have an idToken.
      // The logic below supports this scenario by replacing the id_token_hint request parameter with the client_id
      // parameter when no idToken is available.
      const logoutEndpoint = `${issuer}/protocol/openid-connect/logout`;
      const logoutParams = new URLSearchParams({
        post_logout_redirect_uri: `${window.location.origin}/admin`,
        ...(idToken && { id_token_hint: idToken }), // if idToken exists, add id_token_hint param
        ...(!idToken && { client_id: 'admin-portal' }) // if no idToken, add client_id param
      });

      await signOut({
        redirect: true,
        callbackUrl: `${logoutEndpoint}?${logoutParams}`
      });
    }
  };
};
