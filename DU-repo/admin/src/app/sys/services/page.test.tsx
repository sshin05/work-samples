import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { useGetServiceHealth } from '@/api/services/useGetServiceHealth';
import ServicesPage from './page';
import { render, screen } from '@@/test-utils';

jest.mock('@/api/services/useGetServiceHealth');

describe('Services Page', () => {
  let mockClient;

  beforeAll(() => {
    mockClient = createMockClient();
  });

  it('should render the services page with service statuses', async () => {
    (useGetServiceHealth as jest.Mock).mockReturnValue({
      services: [
        { name: 'APIs', status: 'RUNNING' },
        { name: 'Student portal', status: 'ERROR' },
        { name: 'Admin portal', status: 'UNAVAILABLE' }
      ]
    });

    render(
      <ApolloProvider client={mockClient}>
        <ServicesPage />
      </ApolloProvider>
    );

    expect(screen.getByText('APIs')).toBeInTheDocument();
    expect(screen.getByText('Running')).toBeInTheDocument();
    expect(screen.getByText('Student portal')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Admin portal')).toBeInTheDocument();
    expect(screen.getByText('Unavailable')).toBeInTheDocument();
  });

  it('should render fallback UI when services are unavailable', async () => {
    (useGetServiceHealth as jest.Mock).mockReturnValue({
      services: [
        { name: 'APIs', status: 'ERROR' },
        { name: 'Student portal', status: 'UNAVAILABLE' },
        { name: 'Admin portal', status: 'UNAVAILABLE' }
      ]
    });

    render(
      <ApolloProvider client={mockClient}>
        <ServicesPage />
      </ApolloProvider>
    );

    expect(screen.getByText('APIs')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Student portal')).toBeInTheDocument();
    expect(screen.getByText('Admin portal')).toBeInTheDocument();

    //Use getAllByText and ensure the correct count
    const unavailableTexts = screen.getAllByText('Unavailable');
    expect(unavailableTexts).toHaveLength(2); // Should match the number of unavailable services
  });

  it('should not render an icon when serviceHealthLoading is true', async () => {
    (useGetServiceHealth as jest.Mock).mockReturnValue({
      serviceHealthLoading: true,
      services: [{ name: 'APIs', status: 'RUNNING' }]
    });

    render(
      <ApolloProvider client={mockClient}>
        <ServicesPage />
      </ApolloProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });
});
