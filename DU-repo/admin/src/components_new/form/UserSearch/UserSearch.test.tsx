import { UserSearch } from './UserSearch';
import { renderV3, screen } from '@@/test-utils';

jest.mock('@/api/user/useFindUsersBySearchTextLazy', () => ({
  useFindUsersBySearchTextLazy: jest.fn(() => ({
    usersBySearchLoading: false,
    usersBySearch: null,
    fetchUsersBySearch: jest.fn()
  }))
}));

const mockSetUser = jest.fn();

const defaultProps = {
  helperText: 'helper text',
  error: null
};

describe('UserSearch', () => {
  it('renders without crashing', () => {
    renderV3(<UserSearch {...defaultProps} setUser={mockSetUser} />);
    expect(screen.getByText('helper text')).toBeInTheDocument();
  });

  it('renders with error', () => {
    renderV3(
      <UserSearch
        {...defaultProps}
        setUser={mockSetUser}
        error="error message"
      />
    );
    expect(screen.getAllByText('error message')[0]).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    renderV3(
      <UserSearch
        {...defaultProps}
        setUser={mockSetUser}
        customPlaceholder="custom placeholder"
      />
    );
    expect(
      screen.getByPlaceholderText('custom placeholder')
    ).toBeInTheDocument();
  });

  it('should call setUser with correct values', () => {
    renderV3(
      <UserSearch
        {...defaultProps}
        setUser={mockSetUser}
        customPlaceholder="Search for a user"
      />
    );
    const input = screen.getByPlaceholderText('Search for a user');
    input.focus();
    input.blur();
    expect(mockSetUser).toHaveBeenCalledWith({
      newResults: null,
      input: '',
      showWarn: false
    });
  });
});
