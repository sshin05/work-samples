import { useSession, signOut } from 'next-auth/react';
import { renderHook } from '@@/test-utils';
import {
  getIsDuAdmin,
  getUserRoles,
  useIsDuAdmin,
  useUserRoles,
  useSignOut
} from '@/hooks/useCurrentSession/useCurrentSession';

jest.mock('next-auth/react');

describe('all hooks', () => {
  describe('getIsDuAdmin function', () => {
    it('returns false when session is null', () => {
      const session = null;
      const isDuAdmin = getIsDuAdmin(session);
      expect(isDuAdmin).toBe(false);
    });
  });

  describe('getUserRoles function', () => {
    it('returns default user roles when session is null', () => {
      const session = null;
      const userRoles = getUserRoles(session);
      expect(userRoles).toEqual({
        isDuAdmin: false,
        isAfAdmin: false,
        isSfAdmin: false
      });
    });
  });

  describe('useIsDuAdmin hook', () => {
    it('correctly determines if user is DU admin', () => {
      (useSession as jest.Mock).mockReturnValue({
        data: { user: { roles: ['admin'] } }
      });
      const { result } = renderHook(() => useIsDuAdmin());
      expect(result.current.isDuAdmin).toBe(true);
    });
  });

  describe('useUserRoles hook', () => {
    it('correctly determines user roles', () => {
      (useSession as jest.Mock).mockReturnValue({
        data: { user: { roles: ['admin', 'af-admin'] } }
      });
      const { result } = renderHook(() => useUserRoles());
      expect(result.current).toEqual({
        isDuAdmin: true,
        isAfAdmin: true,
        isSfAdmin: false,
        session: { user: { roles: ['admin', 'af-admin'] } }
      });
    });
  });

  describe('useSignOut hook', () => {
    it('should call signOut with correct parameters when session has idToken and issuer', async () => {
      const mockSession = {
        idToken: 'testIdToken',
        issuer: 'https://foo.bar/auth/realms/digital-university'
      };
      (useSession as jest.Mock).mockReturnValue({ data: mockSession });

      const { result } = renderHook(() => useSignOut());
      await result.current.signOut();

      const expectedLogoutEndpoint = `${mockSession.issuer}/protocol/openid-connect/logout`;
      const expectedParams = new URLSearchParams({
        post_logout_redirect_uri: `${window.location.origin}/admin`,
        id_token_hint: 'testIdToken'
      });

      expect(signOut).toHaveBeenCalledWith({
        redirect: true,
        callbackUrl: `${expectedLogoutEndpoint}?${expectedParams}`
      });
    });
  });
});
