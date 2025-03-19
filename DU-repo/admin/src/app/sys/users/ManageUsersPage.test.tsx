import React from 'react';
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from '@apollo/client';
import * as nextAuth from 'next-auth/react';
import { render, screen, userEvent, waitFor } from '@@/test-utils';
import {
  useExportUsers,
  useCountAllUsers,
  useCountCacEnabledUsers,
  useCountNewUsers
} from '@/api/user';
import ManageUsers from './page';
import { useFindUsersBySearchTextLazy } from '@/api/user/useFindUsersBySearchTextLazy';

jest.mock('@/api/user');
jest.mock('@/api/user/useFindUsersBySearchTextLazy');
jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  useToast: () => [jest.fn(), jest.fn()]
}));

Storage.prototype.setItem = jest.fn();

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn()
}));

let mockSession;

describe('Manage Users Page', () => {
  const mockClient = createMockClient();
  const exportUsersMock = jest.fn(() => Promise.resolve());
  const fetchUsersBySearchMock = jest.fn(() => Promise.resolve());
  beforeEach(() => {
    mockSession = {
      expires: '1',
      user: { email: 'foo@bar.com', name: 'foo bar', roles: ['admin'] }
    };
    (nextAuth.useSession as jest.Mock).mockReturnValue({ data: mockSession });
    (useExportUsers as jest.Mock).mockReturnValue({
      exportUsersData: null,
      exportUsersLoading: false,
      exportUsersError: null,
      exportUsers: exportUsersMock
    });

    (useCountAllUsers as jest.Mock).mockReturnValue({
      countUsers: 1,
      countUsersLoading: false,
      countUsersError: null,
      refetchCountUsers: jest.fn()
    });

    (useCountCacEnabledUsers as jest.Mock).mockReturnValue({
      countCacEnabledUsers: 1,
      countCacEnabledUsersLoading: false,
      countCacEnabledUsersError: null
    });

    (useCountNewUsers as jest.Mock).mockReturnValue({
      countNewUsers: 1,
      countNewUsersLoading: false,
      countNewUsersError: null
    });

    (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
      usersBySearch: [],
      usersBySearchLoading: false,
      usersBySearchError: null,
      isMore: true,
      fetchUsersBySearch: fetchUsersBySearchMock
    });
  });

  it('should render without error', () => {
    render(
      <ApolloProvider client={mockClient}>
        <ManageUsers />
      </ApolloProvider>
    );
    expect(screen.getByText('Total Users')).toBeInTheDocument();
  });
  it('should have different values based on sf-admin user role', () => {
    mockSession = {
      expires: '1',
      user: { email: 'foo@bar.com', name: 'foo bar', roles: ['sf-admin'] }
    };
    (nextAuth.useSession as jest.Mock).mockReturnValue({ data: mockSession });

    render(
      <ApolloProvider client={mockClient}>
        <ManageUsers />
      </ApolloProvider>
    );

    expect(screen.getByText('Total Users')).toBeInTheDocument();
  });

  it('should have different values based on af-admin user role', () => {
    mockSession = {
      expires: '1',
      user: { email: 'foo@bar.com', name: 'foo bar', roles: ['af-admin'] }
    };
    (nextAuth.useSession as jest.Mock).mockReturnValue({ data: mockSession });

    render(
      <ApolloProvider client={mockClient}>
        <ManageUsers />
      </ApolloProvider>
    );

    expect(screen.getByText('Total Users')).toBeInTheDocument();
  });

  it('should handle switching the drop down', async () => {
    const { container } = render(
      <ApolloProvider client={mockClient}>
        <ManageUsers />
      </ApolloProvider>
    );

    const pillButton = container.querySelector('svg[aria-hidden="true"]');
    userEvent.click(pillButton);

    await waitFor(async () => {
      const spaceForceElement = await screen.findByText('Space Force');
      userEvent.click(spaceForceElement);
    });

    userEvent.click(pillButton);
    await waitFor(async () => {
      const airForceElement = await screen.findByText('Air Force');
      userEvent.click(airForceElement);
    });

    userEvent.click(pillButton);
    await waitFor(async () => {
      const globalElement = await screen.findByText('Global');
      userEvent.click(globalElement);
    });

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should test search bar', () => {
    const fetchUsersBySearchMock = jest.fn(() => Promise.resolve());
    (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
      usersBySearchLoading: false,
      usersBySearchError: null,
      usersBySearch: [
        {
          id: '1',
          firstName: 'test first name',
          lastName: 'test last name',
          email: 'test@email.com'
        }
      ],
      isMore: true,
      fetchUsersBySearch: fetchUsersBySearchMock
    });

    render(
      <ApolloProvider client={mockClient}>
        <ManageUsers />
      </ApolloProvider>
    );

    userEvent.click(
      screen.getByPlaceholderText('Search By Name or Email Address')
    );
    userEvent.paste(
      screen.getByPlaceholderText('Search By Name or Email Address'),
      'fizzbuzz@yahoo.com'
    );

    const searchButton = screen.getByText('search');
    userEvent.click(searchButton);
    expect(screen.getByText('No users found')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'LOAD MORE' }));
    expect(fetchUsersBySearchMock).toHaveBeenCalled();
  });

  it('should export users', () => {
    render(
      <ApolloProvider client={mockClient}>
        <ManageUsers />
      </ApolloProvider>
    );

    userEvent.click(
      screen.getByRole('button', { name: 'EXPORT ALL USER DATA' })
    );
    expect(exportUsersMock).toHaveBeenCalled();
  });
});
