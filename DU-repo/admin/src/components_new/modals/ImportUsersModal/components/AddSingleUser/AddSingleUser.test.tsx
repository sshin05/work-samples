import { fireEvent, renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { AddSingleUser } from './AddSingleUser';
import { useFindUsersBySearchTextLazy } from '@/api/user/useFindUsersBySearchTextLazy';

jest.mock('@/api/user/useFindUsersBySearchTextLazy');
jest.mock('@/utils/use-debounce/useDebounce', () => ({
  useDebounce: jest.fn((value, _delay) => value)
}));

type generatedUserType = { email: string; firstName: string; lastName: string };

const generateUsers = (qty: number): generatedUserType[] => {
  const userList: generatedUserType[] = [];
  for (let i = 1; i <= qty; i++) {
    userList.push({
      email: `fizzbuzz${i}@yahoo.com`,
      firstName: `fizz${i}`,
      lastName: `buzz${i}`
    });
  }

  return userList;
};

describe('AddSingleUser', () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    mockOnChange.mockReset();
  });

  describe('Rendering', () => {
    it('should render without errors', () => {
      (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
        usersBySearchLoading: false,
        usersBySearchError: null,
        usersBySearch: [{ email: 'foobar@yahoo.com' }],
        isMore: true,
        fetchUsersBySearch: jest.fn()
      });

      renderV3(
        <AddSingleUser
          setSingleUser={mockOnChange}
          handleNewUser={false}
          userNotFoundText="User not found"
          error=""
        />
      );
      fireEvent.click(screen.getByPlaceholderText('Search Users'));
      userEvent.paste(screen.getByPlaceholderText('Search Users'), 'foobar');
      expect(
        screen.getByText('Found user with email: foobar@yahoo.com')
      ).toBeInTheDocument();
      expect(mockOnChange).toHaveBeenLastCalledWith({
        email: 'foobar@yahoo.com'
      });
    });
  });

  it('should handle search multiple', async () => {
    (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
      usersBySearchLoading: false,
      usersBySearchError: null,
      usersBySearch: [
        { email: 'fizzbuzz@yahoo.com', firstName: 'fizz', lastName: 'buzz' },
        { email: 'fizzbuzz2@yahoo.com', firstName: 'fizz2', lastName: 'buzz2' },
        { email: 'fizzbuzz3@yahoo.com', firstName: 'fizz3', lastName: 'buzz3' }
      ],
      isMore: false,
      fetchUsersBySearch: jest.fn()
    });
    const searchTerm = 'fizzbuzz';

    renderV3(
      <AddSingleUser
        setSingleUser={mockOnChange}
        handleNewUser={false}
        userNotFoundText="User not found"
        error=""
      />
    );

    userEvent.paste(screen.getByPlaceholderText('Search Users'), searchTerm);

    await waitFor(() => {
      expect(
        screen.getByText(/fizzbuzz@yahoo.com | fizz buzz/)
      ).toBeInTheDocument();
    });
    expect(
      screen.getByText(/fizzbuzz2@yahoo.com | fizz2 buzz2/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/fizzbuzz3@yahoo.com | fizz3 buzz3/)
    ).toBeInTheDocument();
  });

  it('should handle search zero', async () => {
    (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
      usersBySearchLoading: false,
      usersBySearchError: null,
      usersBySearch: [],
      isMore: true,
      fetchUsersBySearch: jest.fn()
    });

    renderV3(<AddSingleUser setSingleUser={mockOnChange} />);
    fireEvent.click(screen.getByPlaceholderText('Search Users'));
    userEvent.type(
      screen.getByPlaceholderText('Search Users'),
      'fizzbuzz@yahoo.com'
    );

    expect(
      screen.getByText('No user found with given email')
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenLastCalledWith({
        email: 'fizzbuzz@yahoo.com'
      });
    });
  });

  it('should handle a search with more than 20 serach results', () => {
    (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
      usersBySearchLoading: false,
      usersBySearchError: null,
      usersBySearch: generateUsers(20),
      isMore: true,
      fetchUsersBySearch: jest.fn()
    });

    renderV3(<AddSingleUser setSingleUser={mockOnChange} />);

    fireEvent.click(screen.getByPlaceholderText('Search Users'));
    userEvent.paste(
      screen.getByPlaceholderText('Search Users'),
      'fizzbuzz@yahoo.com'
    );

    expect(
      screen.getByText('20+ matches. Keep typing to narrow results.')
    ).toBeInTheDocument();
  });

  it('should handle search with no results', async () => {
    (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
      usersBySearchLoading: false,
      usersBySearchError: null,
      usersBySearch: [],
      isMore: false,
      fetchUsersBySearch: jest.fn()
    });

    renderV3(<AddSingleUser setSingleUser={mockOnChange} />);
    fireEvent.click(screen.getByPlaceholderText('Search Users'));
    userEvent.paste(
      screen.getByPlaceholderText('Search Users'),
      'fizzbuzz@yahoo.com'
    );

    expect(
      screen.getByText('No user found with given email')
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenLastCalledWith({
        email: 'fizzbuzz@yahoo.com'
      });
    });
  });

  it('should handle search with an empty search term', async () => {
    (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
      usersBySearchLoading: false,
      usersBySearchError: null,
      usersBySearch: [],
      isMore: true,
      fetchUsersBySearch: jest.fn()
    });

    renderV3(<AddSingleUser setSingleUser={mockOnChange} />);
    fireEvent.click(screen.getByPlaceholderText('Search Users'));
    userEvent.type(screen.getByPlaceholderText('Search Users'), '');

    expect(
      screen.queryByText('No user found with given email')
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenLastCalledWith({
        email: ''
      });
    });
  });

  it('should handle search with a very short search term', async () => {
    (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
      usersBySearchLoading: false,
      usersBySearchError: null,
      usersBySearch: [],
      isMore: true,
      fetchUsersBySearch: jest.fn()
    });

    renderV3(<AddSingleUser setSingleUser={mockOnChange} />);
    fireEvent.click(screen.getByPlaceholderText('Search Users'));
    userEvent.type(screen.getByPlaceholderText('Search Users'), 'a');

    expect(
      screen.queryByText('No user found with given email')
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenLastCalledWith({
        email: 'a'
      });
    });
  });

  it('should handle search with a long search term', async () => {
    (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
      usersBySearchLoading: false,
      usersBySearchError: null,
      usersBySearch: [
        { email: 'fizzbuzz@yahoo.com', firstName: 'fizz', lastName: 'buzz' },
        { email: 'fizzbuzz2@yahoo.com', firstName: 'fizz2', lastName: 'buzz2' },
        { email: 'fizzbuzz3@yahoo.com', firstName: 'fizz3', lastName: 'buzz3' }
      ],
      isMore: false,
      fetchUsersBySearch: jest.fn()
    });
    const searchTerm = 'fizzbuzz';

    renderV3(
      <AddSingleUser
        setSingleUser={mockOnChange}
        handleNewUser={false}
        userNotFoundText="User not found"
        error=""
      />
    );

    userEvent.paste(screen.getByPlaceholderText('Search Users'), searchTerm);

    await waitFor(() => {
      expect(
        screen.getByText(/fizzbuzz@yahoo.com | fizz buzz/)
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(/fizzbuzz2@yahoo.com | fizz2 buzz2/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/fizzbuzz3@yahoo.com | fizz3 buzz3/)
    ).toBeInTheDocument();
  });
});
