import { renderV3, screen } from '@@/test-utils';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import SystemRootPage from './page';

jest.mock('@cerberus/react', () => ({
  Text: jest.fn(({ children }) => <div>{children}</div>),
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

describe('SystemRootPage', () => {
  let mockClient;

  beforeAll(() => {
    mockClient = createMockClient();
  });

  it('should render the page title and content', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <SystemRootPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
  });
});
