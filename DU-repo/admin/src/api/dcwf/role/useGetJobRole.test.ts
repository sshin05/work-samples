import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useGetJobRole } from './useGetJobRole';
import type { JobRole } from '@/api/codegen/graphql';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn()
}));

const mockJobRole: JobRole = {
  id: '00000000-0000-0000-0000-000000000000',
  roleId: 'some-valid-id',
  name: 'Some Job Role',
  description: 'description text'
};

const mockJobRoleData = {
  getJobRole: mockJobRole
};

describe('useGetJobRole', () => {
  it('should return data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: mockJobRoleData
    });

    const { result } = renderHook(() =>
      useGetJobRole({ getJobRoleId: 'some-valid-id' })
    );

    const { jobRole, jobRoleLoading, jobRoleError } = result.current;

    expect(jobRole).toEqual(mockJobRole);
    expect(jobRoleLoading).toEqual(false);
    expect(jobRoleError).toBeUndefined();
  });
});
