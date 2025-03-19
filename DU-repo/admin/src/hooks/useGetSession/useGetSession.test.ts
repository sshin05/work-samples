import { useSession, signIn, signOut } from 'next-auth/react';
import { useGetSession } from './useGetSession';

jest.mock('next-auth/react');

describe('useGetSession function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should indicate unauthenticated when the user is not logged in', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated'
    });

    const session = useGetSession();

    expect(session.isAuthenticated).toBe(false);
  });

  it('should handle sign in', () => {
    const mockSignIn = jest.fn();
    (signIn as jest.Mock).mockImplementation(mockSignIn);

    const session = useGetSession();
    session.signIn();

    expect(mockSignIn).toHaveBeenCalledWith('keycloak', {}, {});
  });

  it('should handle register', () => {
    const mockRegister = jest.fn();
    (signIn as jest.Mock).mockImplementation(mockRegister); // i believe signIn is the thing to use for register based on testing.

    const session = useGetSession();
    session.signIn();

    expect(mockRegister).toHaveBeenCalledWith('keycloak', {}, {});
  });

  it('should handle sign out with callback', () => {
    const mockSignOut = jest.fn();
    (signOut as jest.Mock).mockImplementation(mockSignOut);
    (useSession as jest.Mock).mockReturnValue({
      data: {
        idToken: 'asd.fgh.jkl',
        issuer: 'https://foo.bar/auth/realms/test'
      }
    });
    const expectedParams = new URLSearchParams({
      post_logout_redirect_uri: window.location.origin,
      id_token_hint: 'asd.fgh.jkl'
    });

    const session = useGetSession();
    session.signOut();

    expect(mockSignOut).toHaveBeenCalledWith({
      redirect: true,
      callbackUrl: `https://foo.bar/auth/realms/test/protocol/openid-connect/logout?${expectedParams}`
    });
  });

  // Test for roles and isAdmin
  it('should correctly identify admin roles', () => {
    const sessionData = {
      user: { roles: ['admin', 'sf-admin'] },
      status: 'authenticated'
    };
    (useSession as jest.Mock).mockReturnValue({
      data: sessionData,
      status: 'authenticated'
    });

    const session = useGetSession();

    expect(session.isDuAdmin).toBe(true);
    expect(session.isSfAdmin).toBe(true);
    expect(session.isAdmin).toBe(true);
  });
});
