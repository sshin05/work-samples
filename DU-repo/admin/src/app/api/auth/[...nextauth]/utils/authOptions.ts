/* eslint-disable new-cap, camelcase */

import KeycloakProvider from 'next-auth/providers/keycloak';
import type { DuSession } from '@/types/DuSession';
import CredentialsProvider from 'next-auth/providers/credentials';

const { KEYCLOAK_URL, FAKE_AUTH, NODE_ENV } = process.env;

const KEYCLOAK_ISSUER = KEYCLOAK_URL + '/realms/digital-university';
const KEYCLOAK_CLIENT_ID = 'admin-portal';
const KEYCLOAK_CLIENT_SECRET = 'UNUSED_BUT_REQUIRED_BY_NEXTAUTH';

const fakeRoles = NODE_ENV === 'development' && FAKE_AUTH;

/**
 * Authentication flows are hard. Luckily, NextAuth helps us out.
 * However, because of the complexities, documentation has been added as needed.
 * Note: Do not add miscellaneous logic here unless it relates to authentication.
 */
export const authOptions = {
  providers: fakeRoles
    ? [
        CredentialsProvider({
          // The name to display on the sign-in page
          name: 'Fake Login',
          credentials: {
            username: { label: 'Username', type: 'text' },
            password: { label: 'Password', type: 'password' }
          },

          async authorize(credentials) {
            const { username } = credentials;
            // fake auth always works, no need to check credentials
            return {
              id: 'ABCDEF10-1234-1234-1234-123400000000',
              name: username,
              email: `${username}@fake.com`,
              image: null,
              roles: JSON.parse(fakeRoles || '[]'),
              given_name: 'Fake',
              family_name: 'Auth'
            };
          }
        })
      ]
    : [
        KeycloakProvider({
          issuer: KEYCLOAK_ISSUER,
          clientId: KEYCLOAK_CLIENT_ID,
          clientSecret: KEYCLOAK_CLIENT_SECRET,
          authorization: {
            params: {
              scope: 'openid email profile offline_access'
            }
          }
        })
      ],
  session: {
    // maxAge: 10 * 60 * 60 // 10 hours (matches the Keycloak session duration)
    maxAge: 5 * 60 * 60 // 5 hours is the maxAge I've been seeing in the refresh token response.  offline_access above may have changed something?
  },
  pages: {
    // We use a custom signin page that redirects to Keycloak for signin.
    // This is needed so that if the user is not authenticated, they get
    // automatically redirected to the Keycloak signin page.
    signIn: fakeRoles ? null : '/admin/signin'
  },
  callbacks: {
    /**
     * The JWT callback is called for all requests to /api/auth/signin,
     * /api/auth/session, getSession(), unstable_getServerSession(), and useSession().
     * On the initial sign in, we copy information from the Keycloak token so that
     * we can use it downstream. This function also refreshes the access token if
     * it is needed.
     */
    async jwt({ token, profile, account, user }) {
      const INITIAL_SIGN_IN = account && user;

      if (INITIAL_SIGN_IN) {
        // Copy information on initial sign in.
        token.firstName = profile?.given_name || user?.given_name;
        token.lastName = profile?.family_name || user?.family_name;
        token.roles =
          profile?.resource_access['admin-portal']?.roles || user?.roles || [];
        token.accessToken = account?.access_token;
        token.accessTokenExpires = account?.expires_at * 1000;
        token.refreshToken = account?.refresh_token;
        token.idToken = account?.id_token;

        return token;
      }

      // If access token has not expired, just return the token.
      if (Date.now() < token.accessTokenExpires) return token;

      // Access token has expired. Attempt to refresh the token.
      return refreshAccessToken(token, account);
    },
    /**
     * The SESSION callback is called whenever a session is checked. It provides us
     * with the opportunity to copy information to the session so that it is available
     * on the client using useSession.
     */
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.roles = token.roles;
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.idToken = token.idToken;
      session.issuer = KEYCLOAK_ISSUER;

      return session as DuSession;
    },
    /**
     * The REDIRECT callback is called whenever NextAuth needs to perform a browser redirect. It validates that the
     * requested redirect URL is allowed. By default, NextAuth allows redirects to relative URLs and to URLs on the
     * same origin as the base URL. The implementation below also allows redirects to Keycloak. This is primarily
     * needed to allow NextAuth to redirect to Keycloak after signout.
     */
    async redirect({ url, baseUrl }) {
      // Allow redirects to relative URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;

      const origin = new URL(url).origin;
      const keycloakOrigin = new URL(KEYCLOAK_URL).origin;

      // Allow redirects to URLs on the Keycloak origin
      // This is needed for local development and feature branches in GC-Dev
      if (origin === keycloakOrigin) return url;

      // Allow redirects to URLs on the same origin
      if (origin === baseUrl) return url;

      // If redirect URL is not allowed, replace it with the base URL
      return baseUrl;
    }
  }
};

/**
 * This function attempts to referesh the access token. Access tokens have a 5 hour expiration
 * in Keycloak, but the overall session timeout is 10 hours, so we need to be able to refresh
 * the access token during a user's session.
 */
const refreshAccessToken = async (token, account) => {
  try {
    if (fakeRoles) {
      // fake auth always works, no need to refresh token
      return token;
    }

    const refreshToken =
      token?.refreshToken || account?.refreshToken || account?.refresh_token;

    const formData = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: KEYCLOAK_CLIENT_ID,
      refresh_token: refreshToken
    });

    const url = `${KEYCLOAK_ISSUER}/protocol/openid-connect/token`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });

    const result = await response.json();

    if (!response.ok)
      throw new Error(
        'An error occurred attempting to refresh the access token.'
      );

    return {
      ...token,
      accessToken: result.access_token,
      accessTokenExpires: Date.now() + result.expires_in * 1000,
      refreshToken:
        result?.refresh_token ||
        token?.refreshToken ||
        account?.refreshToken ||
        account?.refresh_token,
      error: null
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: {
        code: 'RefreshAccessTokenError',
        message: 'There was a problem authorizing your account.'
      }
    };
  }
};
