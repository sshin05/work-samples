import { renderHook } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useUpdateJobRole } from './useUpdateJobRole';

jest.mock('@apollo/client');

describe('useUpdateJobRole', () => {
  it('should update a jobRole', () => {
    const mockUpdateJobRole = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockUpdateJobRole,
      { loading: false }
    ]);

    const { result } = renderHook(() => useUpdateJobRole());

    result.current.updateJobRole('jobRoleId', {
      roleId: 'roleId',
      name: 'Job Role',
      description: 'description'
    });

    expect(mockUpdateJobRole).toHaveBeenCalledWith({
      variables: {
        updateJobRoleId: 'jobRoleId',
        input: {
          roleId: 'roleId',
          name: 'Job Role',
          description: 'description'
        }
      }
    });
  });
});
