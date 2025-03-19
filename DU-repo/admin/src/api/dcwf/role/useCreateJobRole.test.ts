import { renderHook } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useCreateJobRole } from './useCreateJobRole';

jest.mock('@apollo/client');

describe('useCreateJobRole', () => {
  it('should create a jobRole', () => {
    const mockCreateJobRole = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockCreateJobRole,
      { loading: false }
    ]);

    const { result } = renderHook(() => useCreateJobRole());

    result.current.createJobRole({
      roleId: 'jobRoleId',
      name: 'jobRoleName',
      description: 'description'
    });

    expect(mockCreateJobRole).toHaveBeenCalledWith({
      variables: {
        input: {
          roleId: 'jobRoleId',
          name: 'jobRoleName',
          description: 'description'
        }
      }
    });
  });
});
