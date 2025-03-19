import { useSignOut } from '@/hooks/useCurrentSession/useCurrentSession';
import { render, screen, userEvent } from '@@/test-utils';
import AccessDenied from './page';

jest.mock('@/hooks/useCurrentSession/useCurrentSession');

describe('AccessDenied Page', () => {
  const mockSignOut = jest.fn();
  (useSignOut as jest.Mock).mockReturnValue({
    signOut: mockSignOut
  });

  it('should render Log Out button', () => {
    render(<AccessDenied />);

    const logOutButton = screen.getByText('Log Out');
    expect(logOutButton).toBeInTheDocument();
  });

  it('should call signOut with correct parameters on Log Out button click', () => {
    render(<AccessDenied />);

    const logOutButton = screen.getByText('Log Out');
    userEvent.click(logOutButton);

    expect(mockSignOut).toHaveBeenCalled();
  });
});
