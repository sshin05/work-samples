import { render, screen, fireEvent } from '@@/test-utils';
import { Result } from './Result';
import type { User } from '../../UserSearchInput.types';

const mockUser = {
  email: 'mock@omnifederal-email.com',
  firstName: 'Mock First Name',
  lastName: 'Mock Last Name'
} as User;

const defaultProps = {
  user: mockUser,
  onUserSelect: jest.fn()
};

describe('Result', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all user details', () => {
    render(<Result {...defaultProps} />);

    const userInfo = screen.getByText(
      `${mockUser.email} | ${mockUser.firstName} ${mockUser.lastName}`
    );

    expect(userInfo).toBeInTheDocument();
  });

  it('renders correctly when all of the user details are missing', () => {
    const props = {
      ...defaultProps,
      user: { email: '', firstName: '', lastName: '' } as User
    };

    render(<Result {...props} />);

    const userInfo = screen.getByText(`User Not Found`);

    expect(userInfo).toBeInTheDocument();
  });

  it('renders correctly when some of the user details are missing', () => {
    const props = {
      ...defaultProps,
      user: { email: 'email@email.com', firstName: '', lastName: '' } as User
    };

    render(<Result {...props} />);

    const userInfo = screen.getByText(`email@email.com`);

    expect(userInfo).toBeInTheDocument();
  });

  it('renders correctly when user has partial name', () => {
    const props = {
      ...defaultProps,
      user: {
        email: 'email@email.com',
        firstName: '',
        lastName: 'Last-name-only'
      } as User
    };

    render(<Result {...props} />);

    const userInfo = screen.getByText(`email@email.com | Last-name-only`);

    expect(userInfo).toBeInTheDocument();
  });

  it('calls onUserSelect when clicked', () => {
    render(<Result {...defaultProps} />);

    const userInfo = screen.getByText(
      `${mockUser.email} | ${mockUser.firstName} ${mockUser.lastName}`
    );

    fireEvent.click(userInfo);

    expect(defaultProps.onUserSelect).toHaveBeenCalledTimes(1);
    expect(defaultProps.onUserSelect).toHaveBeenCalledWith(mockUser);
  });
});
