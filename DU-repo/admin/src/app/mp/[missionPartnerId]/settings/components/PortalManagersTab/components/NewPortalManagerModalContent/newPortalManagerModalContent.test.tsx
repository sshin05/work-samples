import { ApolloProvider } from '@apollo/client';
import { NewPortalManagerModalContent } from './NewPortalManagerModalContent';
import { renderV3, screen, userEvent } from '@@/test-utils';
import { createMockClient } from 'mock-apollo-client';

jest.mock('@/components_new/form', () => ({
  UserSearch: ({ setUser, helperText, error }) => (
    <div>
      User Search
      <input
        data-testid="userSearch"
        type="text"
        onChange={e =>
          setUser({
            newResults: [{ id: '1', email: e.target.value }],
            input: e.target.value,
            showWarn: false
          })
        }
      />
      {helperText && <div>{helperText}</div>}
      {error && <div>{error}</div>}
    </div>
  ),
  TextInput: ({ children, ...props }) => <input {...props}>{children}</input>
}));

describe('NewPortalManagerModal', () => {
  const onClose = jest.fn();
  const mockClient = createMockClient();
  const missionPartnerId = {
    id: 'missionPartnerId'
  };

  it('should render', () => {
    renderV3(
      <div id="app-root">
        <ApolloProvider client={mockClient}>
          <NewPortalManagerModalContent
            onClose={onClose}
            missionPartner={missionPartnerId}
          />
        </ApolloProvider>
      </div>
    );
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should render user search and find user', () => {
    renderV3(
      <div id="app-root">
        <ApolloProvider client={mockClient}>
          <NewPortalManagerModalContent
            onClose={onClose}
            missionPartner={missionPartnerId}
          />
        </ApolloProvider>
      </div>
    );

    const userSearchInput = screen.getByTestId('userSearch');

    userEvent.type(userSearchInput, 'foo');

    expect(userSearchInput).toHaveValue('foo');

    expect(screen.getByText('Found user with email: foo')).toBeInTheDocument();

    const firstNameInput = screen.getAllByRole('textbox')[1];
    expect(firstNameInput).toHaveValue('');
  });
});
