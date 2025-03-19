import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useFindJobRoles } from './useFindJobRoles';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn()
}));

const mockJobRole = {
  id: '06aa4d38-8b42-4382-8796-bc01157268fe',
  name: 'Mock Job Role',
  description: 'This is a mock job role'
};

const mockJobRoleData = {
  findJobRoles: {
    data: [mockJobRole],
    total: 1
  }
};

describe('useFindJobRoles', () => {
  it('should return data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: mockJobRoleData
    });

    const { result } = renderHook(() =>
      useFindJobRoles({ pageSize: 25, pageNumber: 1 })
    );

    const { jobRoles, jobRolesTotal, jobRolesLoading, jobRolesError } =
      result.current;

    expect(jobRoles).toEqual([mockJobRole]);
    expect(jobRolesTotal).toEqual(1);
    expect(jobRolesLoading).toEqual(false);
    expect(jobRolesError).toBeUndefined();
  });
});
