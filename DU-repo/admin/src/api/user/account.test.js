import { useQuery } from '@apollo/client';
import { useGetUser } from './useGetUser';
import { useCountAllUsers } from './useCountAllUsers';
import { useFindLearnerCohortMemberships } from './useFindLearnerCohortMemberships';

jest.mock('@apollo/client');

describe('user test', () => {
  describe('useGetUser', () => {
    it('should return data', () => {
      const data = {
        getUser: {
          id: '1',
          firstName: 'test first name',
          lastName: 'test last name',
          email: 'test email'
        }
      };

      useQuery.mockReturnValue({ loading: false, error: null, data });
      const { user, userError, userLoading } = useGetUser();

      expect(user).toEqual(data.getUser);
      expect(userError).toEqual(null);
      expect(userLoading).toEqual(false);
    });

    it('should return null', () => {
      useQuery.mockReturnValue({ loading: false, error: null, data: null });
      const { user, userError, userLoading } = useGetUser();

      expect(user).toEqual(null);
      expect(userError).toEqual(null);
      expect(userLoading).toEqual(false);
    });
  });

  describe('useCountAllUsers', () => {
    it('should return data', () => {
      const data = {
        countAllUsers: {
          count: 1
        }
      };

      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data,
        refetch: jest.fn()
      });
      const {
        countUsers,
        countUsersError,
        countUsersLoading,
        refetchCountUsers
      } = useCountAllUsers();

      expect(countUsers).toEqual(data.countAllUsers);
      expect(countUsersError).toEqual(null);
      expect(countUsersLoading).toEqual(false);
      expect(refetchCountUsers).toBeDefined();
    });

    it('should return null', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: null,
        refetch: jest.fn()
      });
      const {
        countUsers,
        countUsersError,
        countUsersLoading,
        refetchCountUsers
      } = useCountAllUsers();

      expect(countUsers).toEqual(null);
      expect(countUsersError).toEqual(null);
      expect(countUsersLoading).toEqual(false);
      expect(refetchCountUsers).toBeDefined();
    });
  });

  describe('useFindLearnerCohortMemberships', () => {
    it('should return data', () => {
      const data = {
        getUserCohorts: [
          {
            group: {
              id: '1',
              name: 'test group name'
            },
            count: 1,
            missionPartner: {
              id: '1',
              name: 'test mission partner name'
            }
          }
        ]
      };

      useQuery.mockReturnValue({ loading: false, error: null, data });

      const { learnerCohortMemberships } = useFindLearnerCohortMemberships();

      expect(learnerCohortMemberships).toEqual([
        {
          group: {
            id: '1',
            name: 'test group name'
          },
          count: 1,
          missionPartner: {
            id: '1',
            name: 'test mission partner name'
          }
        }
      ]);
    });

    it('should return null', () => {
      useQuery.mockReturnValue({ loading: false, error: null, data: null });
      const { user, userError, userLoading } = useGetUser();

      expect(user).toEqual(null);
      expect(userError).toEqual(null);
      expect(userLoading).toEqual(false);
    });
  });
});
