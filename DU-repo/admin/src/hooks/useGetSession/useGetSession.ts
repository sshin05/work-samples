import { signOut, signIn, useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

export interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  firstName?: string | null; //we need to re-evaluate what data we are storing in session data, cause right now we have name, firstName, and lastName
  lastName?: string | null;
  id?: string;
  roles?: string[];
  portalRoles?: string[];
}

interface CustomSession extends Session {
  user: SessionUser;
  issuer: string;
  idToken: string;
  error: string;
}

export const useGetSession = () => {
  const { data: session, status } = useSession(); // data.session is the session object we set in [...nextauth].js
  const user: SessionUser | undefined = session?.user;

  const isDuAdmin = user?.roles?.includes('admin');
  const isSfAdmin = user?.roles?.includes('sf-admin');
  const isAfAdmin = user?.roles?.includes('af-admin');
  const isMyVectorAdmin = user?.roles?.includes('my-vector-admin');
  const isLabsUser = user?.portalRoles?.includes('labs-beta-user');
  const isAdmin = isDuAdmin || isAfAdmin || isSfAdmin;

  const sessionError = (session as CustomSession)?.error;

  const handleSignin = () => {
    signIn('keycloak', {}, {}); // ...(idpHint && { kc_idp_hint: idpHint })
  };

  // EXPORTED AS `signOut`
  const signOutWithCallback = async () => {
    const { idToken, issuer } = session as CustomSession;

    // Build the Keycloak logout URL
    // There is a temporary scenario where sessions created before this code is deployed will not have an idToken.
    // The logic below supports this scenario by replacing the id_token_hint request parameter with the client_id
    // parameter when no idToken is available.
    const logoutEndpoint = `${issuer}/protocol/openid-connect/logout`;
    const logoutParams = new URLSearchParams({
      post_logout_redirect_uri: window.location.origin,
      ...(idToken && { id_token_hint: idToken }), // if idToken exists, add id_token_hint param
      ...(!idToken && { client_id: 'student-portal' }) // if no idToken, add client_id param
    });

    await signOut({
      redirect: true,
      callbackUrl: `${logoutEndpoint}?${logoutParams}`
    });
  };

  const register = () => {
    signIn('keycloak');
  };

  return {
    status,
    isAuthenticated: status === 'authenticated',
    user,
    isAdmin, // use this for isDuAdmin || isAfAdmin || isSfAdmin;
    isDuAdmin,
    isSfAdmin,
    isAfAdmin,
    isMyVectorAdmin,
    isLabsUser,
    sessionError,
    signIn: handleSignin,
    signOut: signOutWithCallback,
    register
  };
};
