import { useSession, signIn } from 'next-auth/react';
import { render } from '@@/test-utils';
import { useRouter } from 'next/navigation';
import Signin from './page';

jest.mock('next-auth/react');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('Signin Component', () => {
  let expectRouterPush;

  beforeEach(() => {
    expectRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: expectRouterPush });
    (useSession as jest.Mock).mockReturnValue({});
    (signIn as jest.Mock).mockReset();
  });

  it('should call signIn with keycloak when status is unauthenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'unauthenticated'
    });

    render(<Signin />);
    expect(signIn).toHaveBeenCalledWith('keycloak');
  });

  it('should redirect to home page when status is authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated'
    });

    render(<Signin />);
    expect(expectRouterPush).toHaveBeenCalledWith('/');
  });
});
