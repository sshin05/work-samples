import { useMutation } from '@apollo/client';
import { useDeleteRoles } from './useDeleteRoles';
import { renderHook, act } from '@@/test-utils';
import { RoleName } from '../codegen/graphql';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn()
}));

describe('useDeleteRoles', () => {
  it('should handle delete roles mutation correctly', async () => {
    const mockDeleteRoles = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockDeleteRoles,
      { loading: false, error: undefined, data: { deleteRoles: true } }
    ]);

    const { result } = renderHook(() => useDeleteRoles());

    const {
      deleteRoles,
      deleteRolesLoading,
      deleteRolesError,
      deleteRolesData
    } = result.current;

    expect(deleteRolesLoading).toEqual(false);
    expect(deleteRolesError).toEqual(undefined);
    expect(deleteRolesData).toEqual(true);

    // Call the deleteRoles function with test arguments
    await act(async () => {
      await deleteRoles('123', '456', RoleName.PortalManager);
    });

    expect(mockDeleteRoles).toHaveBeenCalledWith({
      variables: {
        userIds: '123',
        missionPartnerId: '456',
        name: 'PORTAL_MANAGER'
      }
    });
  });
});
