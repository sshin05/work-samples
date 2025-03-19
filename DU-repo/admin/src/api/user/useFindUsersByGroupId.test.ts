import { useLazyQuery } from '@apollo/client';
import { useFindUsersByGroupId } from './useFindUsersByGroupId';

jest.mock('@apollo/client');

describe('useFindUsersByGroupId', () => {
  it('should return data', () => {
    const mockRefetch = jest.fn();
    const data = {
      findUsersByGroupId: {
        firstName: 'test'
      }
    };

    (useLazyQuery as jest.Mock).mockReturnValue([
      mockRefetch,
      { loading: false, error: null, data }
    ]);
    const { usersLoading, usersError, users, fetchUsersByGroupId } =
      useFindUsersByGroupId();

    expect(users).toEqual(data.findUsersByGroupId);
    expect(usersError).toEqual(null);
    expect(usersLoading).toEqual(false);
    expect(typeof fetchUsersByGroupId).toBe('function');
    fetchUsersByGroupId('someGroupId');
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('should return null', () => {
    (useLazyQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        loading: false,
        error: null,
        data: null
      }
    ]);
    const { usersLoading, usersError, users, fetchUsersByGroupId } =
      useFindUsersByGroupId();

    expect(users).toEqual([]);
    expect(usersError).toEqual(null);
    expect(usersLoading).toEqual(false);
    expect(typeof fetchUsersByGroupId).toBe('function');
  });
});
