import { render, screen, fireEvent } from '@@/test-utils';
import {
  CREATE_LEARNER_BUTTON_TEXT,
  MORE_RESULTS_TEXT,
  ResultsList
} from './ResultsList';
import type { User } from '../UserSearchInput.types';

const defaultProps = {
  results: [],
  onSelectUser: jest.fn(),
  onCreateNewUser: jest.fn(),
  searchTerm: '',
  hasMoreResults: false
};

describe('ResultsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders no results when results array is empty', () => {
    render(<ResultsList {...defaultProps} />);

    expect(screen.queryByText(/Create a new learner/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/20\+ matches\. Keep typing to narrow results\./i)
    ).not.toBeInTheDocument();
  });

  it('renders results when results array has users', () => {
    const results = [
      {
        email: 'mock-user-1omnifederal.com',
        firstName: 'user-1',
        lastName: 'one'
      },
      {
        email: 'mock-user-2@omnifederal.com',
        firstName: 'user-2',
        lastName: 'two'
      }
    ] as User[];
    render(<ResultsList {...defaultProps} results={results} />);

    expect(screen.getByText(/mock-user-1omnifederal.com/i)).toBeInTheDocument();
    expect(
      screen.getByText(/mock-user-2@omnifederal.com/i)
    ).toBeInTheDocument();
  });

  it('calls onSelectUser when a result is clicked', () => {
    const results = [
      {
        email: 'mock-user-1omnifederal.com',
        firstName: '',
        lastName: ''
      }
    ] as User[];
    const mockOnSelectUser = jest.fn();

    render(
      <ResultsList
        {...defaultProps}
        results={results}
        onSelectUser={mockOnSelectUser}
      />
    );

    fireEvent.click(screen.getByText(results[0].email));
    expect(mockOnSelectUser).toHaveBeenCalledTimes(1);
    expect(mockOnSelectUser).toHaveBeenCalledWith(results[0]);
  });

  it('renders more results message when searchTerm is present and hasMoreResults is true', () => {
    render(
      <ResultsList {...defaultProps} searchTerm="test" hasMoreResults={true} />
    );

    expect(screen.getByText(MORE_RESULTS_TEXT)).toBeInTheDocument();
  });

  it('renders create button when searchTerm length >= 3 and results fewer than 2', () => {
    render(<ResultsList {...defaultProps} searchTerm="test" results={[]} />);

    expect(screen.getByText(CREATE_LEARNER_BUTTON_TEXT)).toBeInTheDocument();
  });

  it('calls onCreateNewUser when create button is clicked', () => {
    const mockOnCreateNewUser = jest.fn();
    render(
      <ResultsList
        {...defaultProps}
        searchTerm="test"
        results={[]}
        onCreateNewUser={mockOnCreateNewUser}
      />
    );

    fireEvent.click(screen.getByText(CREATE_LEARNER_BUTTON_TEXT));
    expect(mockOnCreateNewUser).toHaveBeenCalledTimes(1);
  });
});
