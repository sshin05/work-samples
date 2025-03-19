import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { useSession } from 'next-auth/react';
import {
  useFindAllSettings,
  useEnableSetting,
  useDisableSetting
} from '@/api/setting';
import { renderV3, screen, userEvent } from '@@/test-utils';
import ManageSettings from './page';

jest.mock('next-auth/react');
jest.mock('@/api/setting');
jest.mock('@/api/user');
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() })
}));
jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Text: ({ children }) => <div>{children}</div>
}));

describe('Manage Settings Page', () => {
  const mockSession = {
    expires: '1',
    user: { email: 'foo@bar.com', name: 'foo bar', roles: ['admin'] }
  };

  const unorderedSettingsFromServer = [
    {
      id: 'exchange',
      name: 'Special operations training exchange',
      enabled: false
    },
    { id: 'leaderboard', name: 'Leaderboard', enabled: true }
  ];

  let mockClient;
  const mockEnableSetting = jest.fn();
  const mockDisableSetting = jest.fn();

  beforeAll(() => {
    mockClient = createMockClient();

    (useSession as jest.Mock).mockReturnValue({ data: mockSession });

    (useFindAllSettings as jest.Mock).mockReturnValue({
      settings: unorderedSettingsFromServer,
      settingsError: false,
      settingsLoading: false
    });

    (useEnableSetting as jest.Mock).mockReturnValue({
      enableSetting: mockEnableSetting
    });

    (useDisableSetting as jest.Mock).mockReturnValue({
      disableSetting: mockDisableSetting
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the manage settings page', async () => {
    renderV3(<div id="app-root" />);
    renderV3(
      <ApolloProvider client={mockClient}>
        <ManageSettings />
      </ApolloProvider>
    );
    expect(
      screen.getByText('Special operations training exchange')
    ).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Alert Banner')).toBeInTheDocument();
    expect(screen.getByText('Banner')).toBeInTheDocument();
  });

  it('should display the page title "Manage Settings"', async () => {
    renderV3(<div id="app-root" />);
    renderV3(
      <ApolloProvider client={mockClient}>
        <ManageSettings />
      </ApolloProvider>
    );
    expect(screen.getByText('Manage Settings')).toBeInTheDocument();
  });

  it('should render the manage settings page and click two buttons', async () => {
    renderV3(<div id="app-root" />);
    renderV3(
      <ApolloProvider client={mockClient}>
        <ManageSettings />
      </ApolloProvider>
    );
    const button1 = screen.getAllByText('Enable')[0];
    const button2 = screen.getAllByText('Disable')[0];

    userEvent.click(button1);
    userEvent.click(button2);

    expect(mockEnableSetting).toHaveBeenCalledTimes(1);
    expect(mockDisableSetting).toHaveBeenCalledTimes(1);
  });

  it('should render a loading indicator using aria-busy', async () => {
    (useFindAllSettings as jest.Mock).mockReturnValue({
      settings: [],
      settingsError: false,
      settingsLoading: true
    });

    renderV3(<div id="app-root" />);
    const { container } = renderV3(
      <ApolloProvider client={mockClient}>
        <ManageSettings />
      </ApolloProvider>
    );

    const LoadingDiv = container.querySelectorAll('[aria-busy="true"]');

    expect(LoadingDiv).toHaveLength(1);
  });

  it('should render the settings in the correct order', async () => {
    const unorderedSettings = [
      {
        id: 'exchange',
        name: 'Special operations training exchange',
        enabled: false
      },
      { id: 'alert-banner', name: 'Alert banner', enabled: false },
      { id: 'leaderboard', name: 'Leaderboard', enabled: false }
    ];

    (useFindAllSettings as jest.Mock).mockReturnValue({
      settings: unorderedSettings,
      settingsError: false,
      settingsLoading: false
    });

    renderV3(<div id="app-root" />);
    renderV3(
      <ApolloProvider client={mockClient}>
        <ManageSettings />
      </ApolloProvider>
    );

    const expectedOrder = [
      'Special operations training exchange',
      'Leaderboard',
      'Alert Banner',
      'Banner'
    ];

    const renderedSettings = screen
      .getAllByText(/service|exchange|Leaderboard|Licensing|Banner/)
      .map(el => el.textContent);

    expect(renderedSettings).toEqual(expectedOrder);
  });

  it('should render and interact with all settings correctly', async () => {
    const unorderedSettings = [
      {
        id: 'exchange',
        name: 'Special operations training exchange',
        enabled: true
      },
      { id: 'leaderboard', name: 'Leaderboard', enabled: false }
    ];

    (useFindAllSettings as jest.Mock).mockReturnValue({
      settings: unorderedSettings,
      settingsError: false,
      settingsLoading: false
    });
    renderV3(<div id="app-root" />);
    renderV3(
      <ApolloProvider client={mockClient}>
        <ManageSettings />
      </ApolloProvider>
    );

    unorderedSettingsFromServer.forEach(setting => {
      expect(screen.getByText(setting.name)).toBeInTheDocument();
    });

    const enableButtons = screen.queryAllByText('Enable');
    const disableButtons = screen.queryAllByText('Disable');
    const editContentButtons = screen.getAllByText('Edit Content');

    expect(disableButtons).toHaveLength(1);

    userEvent.click(enableButtons[0]);
    userEvent.click(disableButtons[0]);
    userEvent.click(editContentButtons[0]);
    userEvent.click(editContentButtons[1]);

    expect(mockEnableSetting).toHaveBeenCalledTimes(1);
    expect(mockDisableSetting).toHaveBeenCalledTimes(1);
  });

  it('should render and disable correctly', async () => {
    renderV3(<div id="app-root" />);
    renderV3(
      <ApolloProvider client={mockClient}>
        <ManageSettings />
      </ApolloProvider>
    );

    const disableButtons = screen.queryAllByText('Disable');

    userEvent.click(disableButtons[0]);

    expect(mockDisableSetting).toHaveBeenCalledTimes(1);
  });
});
