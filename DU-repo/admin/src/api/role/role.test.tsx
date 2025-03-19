import { useQuery, useMutation } from '@apollo/client';
import { render, screen } from '@testing-library/react';
import { useFindRolesByMissionPartnerId } from './useFindRolesByMissionPartnerId';
import { useFindUserRoles } from './useFindUserRoles';
import { useCreateRole } from './useCreateRole';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  gql: jest.fn()
}));

describe('useFindRolesByMissionPartnerId', () => {
  const RoleComponent = () => {
    const { roleUserInfoData } =
      useFindRolesByMissionPartnerId('missionPartnerId');
    const { createRole } = useCreateRole();
    enum RoleName {
      PortalViewer = 'PORTAL_VIEWER'
    }
    createRole({
      missionPartnerId: 'missionPartnerId',
      name: RoleName.PortalViewer,
      userId: 'userId'
    });

    return (
      <>
        <p>{roleUserInfoData[0].userId}</p>
      </>
    );
  };
  it('should use hook without error', () => {
    const mockRefetch = jest.fn();
    const data = {};

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        findRolesByMissionPartnerId: [{ userId: 'test1' }]
      },
      refetch: mockRefetch
    });

    (useMutation as jest.Mock).mockReturnValue([
      () => {
        // Intentionally left empty.
      },
      { loading: false, error: false, data }
    ]);

    render(<RoleComponent />);
    expect(screen.getByText('test1')).toBeInTheDocument();
  });
});

describe('useFindUserRoles', () => {
  const RoleComponent = () => {
    const { userRolesData } = useFindUserRoles();

    return (
      <>
        <p>{userRolesData[0].missionPartnerId}</p>
      </>
    );
  };
  it('should use hook without error', () => {
    const mockRefetch = jest.fn();

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        getUser: { roles: [{ missionPartnerId: 'test2' }] }
      },
      refetch: mockRefetch
    });

    render(<RoleComponent />);
    expect(screen.getByText('test2')).toBeInTheDocument();
  });
});
