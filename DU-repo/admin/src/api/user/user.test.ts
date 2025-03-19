import { useQuery, useMutation } from '@apollo/client';
import { safelyGetHookContents } from '@@/test-utils';
import { useGetUser } from './useGetUser';
import { useCountAllUsers } from './useCountAllUsers';
import { useCountNewUsers } from './useCountNewUsers';
import { useCountCacEnabledUsers } from './useCountCacEnabledUsers';
import { useAddGroupMembership } from './useAddGroupMembership';
import { useAddCoursesToUser } from './useAddCoursesToUser';
import { useAddAssessmentsToUser } from './useAddAssessmentsToUser';
import { useImportBulkUsers } from './useImportBulkUsers';
import { useAddLicenseToUsers } from './useAddLicenseToUsers';
import { useFindLearnerCohortMemberships } from './useFindLearnerCohortMemberships';
import { useToggleAllowContractorAccess } from './useToggleAllowContractorAccess';

jest.mock('@apollo/client');

describe('users test', () => {
  describe('useGetUser', () => {
    it('should return data', () => {
      const data = {
        getUser: {
          id: '1'
        }
      };

      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data
      });
      const { user, userError, userLoading } = useGetUser();

      expect(user).toEqual(data.getUser);
      expect(userError).toEqual(null);
      expect(userLoading).toEqual(false);
    });

    it('should return null', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data: null
      });
      const { user, userError, userLoading } = useGetUser();

      expect(user).toEqual(null);
      expect(userError).toEqual(null);
      expect(userLoading).toEqual(false);
    });
  });

  describe('useCountAllUsers', () => {
    it('should return data', async () => {
      const mockRefetch = jest.fn();
      const data = {
        countAllUsers: {
          branch: 'test'
        }
      };

      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data,
        refetch: mockRefetch
      });
      const {
        countUsersLoading,
        countUsersError,
        countUsers,
        refetchCountUsers
      } = useCountAllUsers();

      expect(countUsers).toEqual(data.countAllUsers);
      expect(countUsersError).toEqual(null);
      expect(countUsersLoading).toEqual(false);
      expect(refetchCountUsers.constructor.name).toBe('Function');
      await refetchCountUsers();
      expect(mockRefetch).toHaveBeenCalled();
    });

    it('should return null', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data: null,
        refetch: jest.fn()
      });
      const {
        countUsersLoading,
        countUsersError,
        countUsers,
        refetchCountUsers
      } = useCountAllUsers();

      expect(countUsers).toEqual(null);
      expect(countUsersError).toEqual(null);
      expect(countUsersLoading).toEqual(false);
      expect(refetchCountUsers.constructor.name).toBe('Function');
    });
  });

  describe('useCountNewUsers', () => {
    it('should return data', () => {
      const data = {
        countNewUsers: {
          branch: 'test'
        }
      };

      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data
      });
      const { countNewUsersLoading, countNewUsersError, countNewUsers } =
        useCountNewUsers('test', 7);

      expect(countNewUsers).toEqual(data.countNewUsers);
      expect(countNewUsersError).toEqual(null);
      expect(countNewUsersLoading).toEqual(false);
    });

    it('should return null', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data: null
      });
      const { countNewUsersLoading, countNewUsersError, countNewUsers } =
        useCountNewUsers('test', 7);

      expect(countNewUsers).toEqual(null);
      expect(countNewUsersError).toEqual(null);
      expect(countNewUsersLoading).toEqual(false);
    });
  });

  describe('useCountCacEnabledUsers', () => {
    it('should return data', () => {
      const data = {
        countCacEnabledUsers: {
          branch: 'test'
        }
      };

      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data
      });
      const {
        countCacEnabledUsersLoading,
        countCacEnabledUsersError,
        countCacEnabledUsers
      } = useCountCacEnabledUsers('branch');

      expect(countCacEnabledUsers).toEqual(data.countCacEnabledUsers);
      expect(countCacEnabledUsersError).toEqual(null);
      expect(countCacEnabledUsersLoading).toEqual(false);
    });

    it('should return null', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data: null
      });
      const {
        countCacEnabledUsersLoading,
        countCacEnabledUsersError,
        countCacEnabledUsers
      } = useCountCacEnabledUsers('branch');

      expect(countCacEnabledUsers).toEqual(null);
      expect(countCacEnabledUsersError).toEqual(null);
      expect(countCacEnabledUsersLoading).toEqual(false);
    });
  });

  describe('useAddGroupMembership', () => {
    it('should return data', async () => {
      const mockFN = jest.fn();
      const data = {
        addGroupMembership: {
          id: 'test'
        }
      };

      (useMutation as jest.Mock).mockReturnValue([
        mockFN,
        { loading: false, error: null, data }
      ]);
      const {
        groupMembershipData,
        groupMembershipError,
        groupMembershipLoading,
        addGroupMembership
      } = useAddGroupMembership();

      expect(groupMembershipData).toEqual(data.addGroupMembership);
      expect(groupMembershipError).toEqual(null);
      expect(groupMembershipLoading).toEqual(false);
      expect(addGroupMembership.constructor.name).toBe('Function');
      await addGroupMembership({
        user: {
          email: 'test@placeholder.com',
          firstName: 'Jane',
          lastName: 'Doe'
        },
        groupId: '123'
      });
      expect(mockFN).toHaveBeenCalled();
    });

    it('should return null', () => {
      (useMutation as jest.Mock).mockReturnValue([
        jest.fn(),
        { loading: false, error: null, data: null }
      ]);
      const {
        groupMembershipData,
        groupMembershipError,
        groupMembershipLoading,
        addGroupMembership
      } = useAddGroupMembership();

      expect(groupMembershipData).toEqual(null);
      expect(groupMembershipError).toEqual(null);
      expect(groupMembershipLoading).toEqual(false);
      expect(addGroupMembership.constructor.name).toBe('Function');
    });
  });

  describe('useToggleAllowContractorAccess', () => {
    it('should return data', async () => {
      const mockFN = jest.fn();
      const data = {
        __typename: 'User',
        id: '123',
        canAccessFullDu: true
      };

      (useMutation as jest.Mock).mockReturnValue([
        mockFN,
        { loading: false, error: null, data }
      ]);

      const {
        toggleAllowContractorAccess,
        toggleAllowContractorAccessLoading,
        toggleAllowContractorAccessError
      } = safelyGetHookContents(useToggleAllowContractorAccess) as ReturnType<
        typeof useToggleAllowContractorAccess
      >;

      expect(toggleAllowContractorAccessError).toEqual(null);
      expect(toggleAllowContractorAccessLoading).toEqual(false);
      expect(toggleAllowContractorAccess.constructor.name).toBe(
        'AsyncFunction'
      );

      await toggleAllowContractorAccess('123', true);
      expect(mockFN).toHaveBeenCalled();
    });
  });

  describe('useImportBulkUsers', () => {
    it('should return data', () => {
      const data = {
        importBulkUsers: {
          id: 'test'
        }
      };

      (useMutation as jest.Mock).mockReturnValue([
        () => {
          // Intentionally empty
        },
        { loading: false, error: null, data }
      ]);
      const {
        importBulkUsersData,
        importBulkUsersError,
        importBulkUsersLoading,
        importBulkUsers
      } = useImportBulkUsers();

      expect(importBulkUsersData).toEqual({ id: 'test' });
      expect(importBulkUsersError).toEqual(null);
      expect(importBulkUsersLoading).toEqual(false);
      expect(importBulkUsers).toBeInstanceOf(Function);
    });

    it('should return null', () => {
      (useMutation as jest.Mock).mockReturnValue([
        () => {
          // Intentionally empty
        },
        { loading: false, error: null, data: null }
      ]);
      const {
        importBulkUsersData,
        importBulkUsersError,
        importBulkUsersLoading,
        importBulkUsers
      } = useImportBulkUsers();

      expect(importBulkUsersData).toEqual(null);
      expect(importBulkUsersError).toEqual(null);
      expect(importBulkUsersLoading).toEqual(false);
      expect(importBulkUsers).toBeInstanceOf(Function);
    });
  });

  describe('useAddLicenseToUsers', () => {
    it('should return data', () => {
      const data = {
        addLicenseToUsers: {
          id: 'test'
        }
      };

      (useMutation as jest.Mock).mockReturnValue([
        () => {
          // Intentionally empty
        },
        { loading: false, error: null, data }
      ]);
      const {
        addLicenseToUsersData,
        addLicenseToUsersError,
        addLicenseToUsersLoading,
        addLicenseToUsers
      } = useAddLicenseToUsers();

      expect(addLicenseToUsersData).toEqual({ id: 'test' });
      expect(addLicenseToUsersError).toEqual(null);
      expect(addLicenseToUsersLoading).toEqual(false);
      expect(addLicenseToUsers).toBeInstanceOf(Function);
    });

    it('should return null', () => {
      (useMutation as jest.Mock).mockReturnValue([
        () => {
          // Intentionally empty
        },
        { loading: false, error: null, data: null }
      ]);
      const {
        addLicenseToUsersData,
        addLicenseToUsersError,
        addLicenseToUsersLoading,
        addLicenseToUsers
      } = useAddLicenseToUsers();

      expect(addLicenseToUsersData).toEqual(null);
      expect(addLicenseToUsersError).toEqual(null);
      expect(addLicenseToUsersLoading).toEqual(false);
      expect(addLicenseToUsers).toBeInstanceOf(Function);
    });
  });

  describe('useAddCoursesToUser', () => {
    it('should return', async () => {
      const mockFN = jest.fn();
      (useMutation as jest.Mock).mockReturnValue([
        mockFN,
        { loading: false, error: null }
      ]);
      const {
        addCoursesToUserError,
        addCoursesToUserLoading,
        addCoursesToUser
      } = useAddCoursesToUser();

      expect(addCoursesToUserError).toEqual(null);
      expect(addCoursesToUserLoading).toEqual(false);
      expect(addCoursesToUser).toBeInstanceOf(Function);
      await addCoursesToUser(
        'sampleUserId',
        ['courseId1', 'courseId2'],
        'sampleMissionPartnerId'
      );
      expect(mockFN).toHaveBeenCalled();
    });
  });

  describe('useAddAssessmentsToUser', () => {
    it('should return', async () => {
      const mockFN = jest.fn();
      (useMutation as jest.Mock).mockReturnValue([
        mockFN,
        { loading: false, error: null }
      ]);
      const {
        addAssessmentsToUserError,
        addAssessmentsToUserLoading,
        addAssessmentsToUser
      } = useAddAssessmentsToUser();

      expect(addAssessmentsToUserError).toEqual(null);
      expect(addAssessmentsToUserLoading).toEqual(false);
      expect(addAssessmentsToUser).toBeInstanceOf(Function);
      await addAssessmentsToUser(
        'sampleUserId',
        ['assessmentId1'],
        'sampleMissionPartnerId'
      );
      expect(mockFN).toHaveBeenCalled();
    });
  });

  describe('useFindLearnerCohortMemberships', () => {
    it('should return', () => {
      const data = {
        getUserCohorts: [
          {
            group: {
              id: '1',
              name: 'Test 1'
            },
            count: 1,
            missionPartner: {
              id: '1',
              name: 'Test 1'
            }
          }
        ]
      };
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data
      });
      const {
        learnerCohortsLoading,
        learnerCohortsError,
        learnerCohortMemberships
      } = useFindLearnerCohortMemberships(
        'sampleUserId',
        'sampleMissionPartnerId'
      );

      expect(learnerCohortsLoading).toEqual(false);
      expect(learnerCohortsError).toEqual(null);
      expect(learnerCohortMemberships).toEqual([
        {
          group: {
            id: '1',
            name: 'Test 1'
          },
          count: 1,
          missionPartner: {
            id: '1',
            name: 'Test 1'
          }
        }
      ]);
    });
    it('should return', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data: null
      });
      const {
        learnerCohortsLoading,
        learnerCohortsError,
        learnerCohortMemberships
      } = useFindLearnerCohortMemberships(
        'sampleUserid',
        'sampleMissionPartnerId'
      );

      expect(learnerCohortsLoading).toEqual(false);
      expect(learnerCohortsError).toEqual(null);
      expect(learnerCohortMemberships).toEqual([]);
    });
  });
});
