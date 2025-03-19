import { renderV3, screen, fireEvent } from '@@/test-utils';
import { UserResult } from './UserResult';

describe('UserResult Component', () => {
  const mockSelectUser = jest.fn();
  const user = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe'
  };

  it('renders', () => {
    renderV3(
      <UserResult user={user} selectUser={mockSelectUser} searchTerm="" />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('highlights the search term in the email, first name, and last name', () => {
    renderV3(
      <UserResult user={user} selectUser={mockSelectUser} searchTerm="test" />
    );
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i).tagName).toBe('STRONG');
  });

  it('calls selectUser when clicked', () => {
    renderV3(
      <UserResult user={user} selectUser={mockSelectUser} searchTerm="" />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mockSelectUser).toHaveBeenCalledWith(user);
  });

  it('does not highlight when searchTerm is empty', () => {
    renderV3(
      <UserResult user={user} selectUser={mockSelectUser} searchTerm="" />
    );
    expect(
      screen.getByText(`${user.email} | ${user.firstName} ${user.lastName}`)
    ).toBeInTheDocument();
    expect(screen.queryByRole('strong')).not.toBeInTheDocument();
  });
});
