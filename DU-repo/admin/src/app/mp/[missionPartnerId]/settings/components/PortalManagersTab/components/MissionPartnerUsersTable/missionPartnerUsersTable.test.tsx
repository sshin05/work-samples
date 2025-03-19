import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { screen, fireEvent, waitFor, renderV3 } from '@@/test-utils';
import {
  useCreateRole,
  useFindRolesByMissionPartnerId,
  useDeleteRoles
} from '@/api/role';
import { MissionPartnerUsersTable } from './MissionPartnerUsersTable';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import type { FindRolesByMissionPartnerIdQuery } from '@/api/codegen/graphql';
import type { SessionUser } from '@/hooks/useGetSession/useGetSession';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush
  }))
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children }) => <div>{children}</div>,
  Label: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Select: ({ children }) => <select>{children}</select>,
  Option: ({ children }) => <option>{children}</option>,
  Modal: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Input: ({ onChange }) => <input onChange={onChange} />,
  Tabs: ({ children }) => <div>{children}</div>,
  TabsList: ({ children }) => <div>{children}</div>,
  Tab: ({ children }) => <div>{children}</div>,
  TabPanel: ({ children }) => <div>{children}</div>,
  Table: ({ children }) => <table>{children}</table>,
  Td: ({ children }) => <td>{children}</td>,
  Tr: ({ children }) => <tr>{children}</tr>,
  Th: ({ children }) => <th>{children}</th>,
  Thead: ({ children }) => <thead>{children}</thead>,
  Tbody: ({ children }) => <tbody>{children}</tbody>,
  Checkbox: ({ children, onChange }) => (
    <input type="checkbox" onChange={onChange}>
      {children}
    </input>
  ),
  ConfirmModal: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children }) => <input>{children}</input>
}));

jest.mock('@cerberus/icons', () => ({
  Edit: () => 'Edit',
  TrashCan: () => 'Delete',
  Add: () => <div>Add</div>,
  ArrowsVertical: () => 'ArrowsVertical',
  SortAscending: () => 'SortAscending',
  SortDescending: () => 'SortDescending',
  Search: () => 'Search'
}));

const mockClient = createMockClient();
jest.mock('@/api/role');
beforeAll(() => {
  jest.clearAllMocks();

  (useCreateRole as jest.Mock).mockReturnValue({
    createRole: jest.fn()
  });

  (useDeleteRoles as jest.Mock).mockReturnValue({
    deleteRoles: jest.fn().mockReturnValue(Promise.resolve())
  });

  (useFindRolesByMissionPartnerId as jest.Mock).mockReturnValue({
    roleUserInfoData,
    refetchRoleUserInfo: jest.fn()
  });
});

const missionPartner = {
  id: '1234'
};
const myUser = { id: '1' } as SessionUser;
const roleUserInfoData = [
  {
    id: '1',
    name: 'PORTAL_MANAGER',
    userDate: '2023-01-19T20:20:56.506Z',
    userEmail: 'roger@toon.com',
    userId: '19191',
    userName: 'Roger Rabbit'
  } as FindRolesByMissionPartnerIdQuery['findRolesByMissionPartnerId'][number],
  {
    id: '2',
    name: 'PORTAL_MANAGER',
    userDate: null,
    userEmail: 'bugs@bunny.com',
    userId: '12345',
    userName: 'Bugs Bunny'
  } as FindRolesByMissionPartnerIdQuery['findRolesByMissionPartnerId'][number]
];

describe('(Delete) Portal Manager', () => {
  it('should render', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerUsersTable
          users={roleUserInfoData}
          missionPartner={missionPartner}
          myUser={myUser}
          loading={false}
          showNewPortalManagerModal={jest.fn()}
        />
      </ApolloProvider>
    );
    const [nameHeader, emailHeader, roleHeader, userDateHeader] =
      screen.getAllByRole('columnheader');
    expect(nameHeader).toHaveTextContent('Name');
    expect(emailHeader).toHaveTextContent('Email');
    expect(roleHeader).toHaveTextContent('Role');
    expect(userDateHeader).toHaveTextContent('Date');

    expect(
      screen.getByRole('cell', { name: roleUserInfoData[0].userName })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('cell', { name: roleUserInfoData[0].userEmail })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('cell', {
        name: abbreviatedDayDate(roleUserInfoData[0].userDate)
      })
    ).toBeInTheDocument();

    const AddPortalManagerButton = screen.getByText(/new portal manager/i);
    expect(AddPortalManagerButton).toBeInTheDocument();
  });

  it('Click on Portal Manager and email', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerUsersTable
          users={roleUserInfoData}
          missionPartner={missionPartner}
          myUser={myUser}
          loading={false}
          showNewPortalManagerModal={jest.fn()}
        />
      </ApolloProvider>
    );

    const portalManagerButton = screen.getByText(/Roger Rabbit/i);
    fireEvent.click(portalManagerButton);
    expect(mockPush).toHaveBeenCalledWith(
      getRouteUrl(
        routeGenerators.MissionPartnerPortalManager({
          missionPartnerId: '1234',
          userId: '19191'
        })
      )
    );

    const portalManagerEmailButton = screen.getByText(/roger@toon.com/i);
    fireEvent.click(portalManagerEmailButton);
    expect(mockPush).toHaveBeenCalledWith(
      getRouteUrl(
        routeGenerators.MissionPartnerPortalManager({
          missionPartnerId: '1234',
          userId: '19191'
        })
      )
    );
  });

  it('should cancel delete portal manager', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerUsersTable
          users={roleUserInfoData}
          missionPartner={missionPartner}
          myUser={myUser}
          loading={false}
          showNewPortalManagerModal={jest.fn()}
        />
      </ApolloProvider>
    );
    const editButton = screen.getAllByRole('button', {
      name: /Edit/i
    })[0];
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    const [checkbox1] = screen.getAllByRole('checkbox');
    fireEvent.click(checkbox1);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('should successfully delete a portal manager', async () => {
    (useFindRolesByMissionPartnerId as jest.Mock).mockReturnValue({
      roleUserInfoData,
      refetchRoleUserInfo: jest.fn()
    });

    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerUsersTable
          users={roleUserInfoData}
          missionPartner={missionPartner}
          myUser={myUser}
          loading={false}
          showNewPortalManagerModal={jest.fn()}
        />
      </ApolloProvider>
    );

    const editButton = screen.getAllByRole('button', {
      name: /Edit/i
    })[0];
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    const [checkbox1] = screen.getAllByRole('checkbox');
    fireEvent.click(checkbox1);
    fireEvent.click(screen.getByText('Remove'));
    await waitFor(() =>
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({
          heading: 'Success'
        })
      )
    );
  });

  it('should delete portal manager with error results', async () => {
    (useFindRolesByMissionPartnerId as jest.Mock).mockReturnValue({
      roleUserInfoData,
      refetchRoleUserInfo: jest.fn()
    });

    (useDeleteRoles as jest.Mock).mockReturnValue({
      deleteRoles: jest.fn(() => Promise.reject(new Error('Simulated Error')))
    });
    renderV3(
      <ApolloProvider client={mockClient}>
        <MissionPartnerUsersTable
          users={roleUserInfoData}
          missionPartner={missionPartner}
          myUser={myUser}
          loading={false}
          showNewPortalManagerModal={jest.fn()}
        />
      </ApolloProvider>
    );

    const editButton = screen.getAllByRole('button', {
      name: /Edit/i
    })[0];
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    const [checkbox1] = screen.getAllByRole('checkbox');
    fireEvent.click(checkbox1);
    fireEvent.click(screen.getByText('Remove'));
    await waitFor(() =>
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({
          heading: 'Error'
        })
      )
    );
  });
});
