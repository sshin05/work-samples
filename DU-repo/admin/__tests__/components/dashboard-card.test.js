import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { render, screen } from '@@/test-utils';
import DashboardCard from '../../src/components/metrics-dashboard/dashboard-card';

describe(' Dashboard Card', () => {
  let mockClient;

  beforeAll(() => {
    mockClient = createMockClient();
  });
  it('should render a dashboard card', () => {
    render(
      <ApolloProvider client={mockClient}>
        <DashboardCard
          headingTitle="label1"
          headingValue={911}
          footerTitle="label2"
          footerValue="Across 99 vendors"
        />
      </ApolloProvider>
    );
    expect(screen.getByText('label1')).toBeInTheDocument();
    expect(screen.getByText('label2')).toBeInTheDocument();
    expect(screen.getByText(911)).toBeInTheDocument();
    expect(screen.getByText('Across 99 vendors')).toBeInTheDocument();
  });
});
