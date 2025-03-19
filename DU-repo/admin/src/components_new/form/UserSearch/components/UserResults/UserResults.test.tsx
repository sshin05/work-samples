import { renderV3, screen } from '@@/test-utils';
import { UserResults } from './UserResults';

jest.mock('./components/UserResult', () => ({
  UserResult: jest.fn(() => <div>UserResult Component</div>)
}));

describe('UserResults Component', () => {
  const mockSelectUser = jest.fn();
  const results = [
    { email: 'test1@example.com', firstName: 'John', lastName: 'Doe' },
    { email: 'test2@example.com', firstName: 'Jane', lastName: 'Doe' }
  ];

  it('renders the correct number of UserResult components', () => {
    renderV3(
      <UserResults
        results={results}
        selectUser={mockSelectUser}
        searchTerm=""
      />
    );

    expect(screen.getAllByText('UserResult Component')).toHaveLength(
      results.length
    );
  });

  it('renders nothing when results is empty', () => {
    renderV3(
      <UserResults results={[]} selectUser={mockSelectUser} searchTerm="" />
    );

    expect(screen.queryByText('UserResult Component')).not.toBeInTheDocument();
  });
});
