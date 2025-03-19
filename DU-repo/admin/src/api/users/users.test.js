import { useMutation, useQuery } from '@apollo/client';
import { useFindUserById } from './useFindUserById';
import { useFindFieldCommands } from './useFindFieldCommands';
import { useFindSpaceDeltas } from './useFindSpaceDeltas';
import { useFindSquadrons } from './useFindSquadrons';
import { useAddPlansToUser } from './useAddPlansToUser';
import { useCountActiveUsersByMissionPartnerId } from './useCountActiveUsersByMissionPartnerId';
import { useCountOnboardedUsersByMissionPartnerId } from './useCountOnboardedUsersByMissionPartnerId';
import { useCountUsersByMissionPartnerId } from './useCountUsersByMissionPartnerId';
import { useFindOrganizations } from './useFindOrganizations';
import { useRevokeVendorLicensesForUsers } from './useRevokeVendorLicensesForUsers';
import { useRemoveUsersFromMissionPartner } from './useRemoveUsersFromMissionPartner';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('users test', () => {
  describe('useFindUserById', () => {
    it('should return data', () => {
      const data = {
        findUserById: {
          id: '1',
          firstName: 'test first name',
          lastName: 'test last name',
          email: 'test email'
        }
      };

      useQuery.mockReturnValue({ loading: false, error: null, data });
      const { userById, userByIdError, userByIdLoading } = useFindUserById();

      expect(userById).toEqual(data.findUserById);
      expect(userByIdError).toEqual(null);
      expect(userByIdLoading).toEqual(false);
    });

    it('should return null', () => {
      useQuery.mockReturnValue({ loading: false, error: null, data: null });
      const { userById, userByIdError, userByIdLoading } = useFindUserById();

      expect(userById).toEqual({});
      expect(userByIdError).toEqual(null);
      expect(userByIdLoading).toEqual(false);
    });
  });

  describe('useAddPlansToUser', () => {
    it('should return data', () => {
      const data = {
        addTrainingPlansToUser: {
          id: '1',
          userId: 'userId1',
          planType: 'test plan type',
          planSourceId: 'planSourceId1'
        }
      };
      const mockAddPlansToUser = jest.fn();
      useMutation.mockReturnValue([
        mockAddPlansToUser,
        { loading: false, error: null, data }
      ]);

      const {
        addPlansToUser,
        addPlansToUserData,
        addPlansToUserError,
        addPlansToUserLoading
      } = useAddPlansToUser();

      expect(addPlansToUser).toBeDefined();
      expect(addPlansToUserData).toEqual(data.addTrainingPlansToUser);
      expect(addPlansToUserError).toEqual(null);
      expect(addPlansToUserLoading).toEqual(false);
      addPlansToUser('userId1', [], 'missionPartnerId1');
      expect(mockAddPlansToUser).toHaveBeenCalledWith({
        variables: {
          userId: 'userId1',
          plans: [],
          missionPartnerId: 'missionPartnerId1'
        }
      });
    });
  });

  describe('useFindFieldCommands', () => {
    it('should return data', () => {
      const data = {
        findFieldCommands: [
          {
            title: 'testTitle1'
          },
          {
            title: 'testTitle2'
          }
        ]
      };

      useQuery.mockReturnValue({ loading: false, error: null, data });
      const { fieldCommands, fieldCommandsError, fieldCommandsLoading } =
        useFindFieldCommands();

      expect(fieldCommands).toEqual(data.findFieldCommands);
      expect(fieldCommandsError).toEqual(null);
      expect(fieldCommandsLoading).toEqual(false);
    });

    it('should return null', () => {
      useQuery.mockReturnValue({ loading: false, error: null, data: null });
      const { fieldCommands, fieldCommandsError, fieldCommandsLoading } =
        useFindFieldCommands();

      expect(fieldCommands).toEqual(null);
      expect(fieldCommandsError).toEqual(null);
      expect(fieldCommandsLoading).toEqual(false);
    });
  });

  describe('useFindSpaceDeltas', () => {
    it('should return data', () => {
      const data = {
        findSpaceDeltas: [
          {
            title: 'testTitle1'
          },
          {
            title: 'testTitle2'
          }
        ]
      };

      useQuery.mockReturnValue({ loading: false, error: null, data });
      const { spaceDeltas, spaceDeltasError, spaceDeltasLoading } =
        useFindSpaceDeltas();

      expect(spaceDeltas).toEqual(data.findSpaceDeltas);
      expect(spaceDeltasError).toEqual(null);
      expect(spaceDeltasLoading).toEqual(false);
    });

    it('should return null', () => {
      useQuery.mockReturnValue({ loading: false, error: null, data: null });
      const { spaceDeltas, spaceDeltasError, spaceDeltasLoading } =
        useFindSpaceDeltas();

      expect(spaceDeltas).toEqual(null);
      expect(spaceDeltasError).toEqual(null);
      expect(spaceDeltasLoading).toEqual(false);
    });
  });

  describe('useFindSquadrons', () => {
    it('should return data', () => {
      const data = {
        findSquadrons: [
          {
            title: 'testTitle1'
          },
          {
            title: 'testTitle2'
          }
        ]
      };

      useQuery.mockReturnValue({ loading: false, error: null, data });
      const { squadrons, squadronsError, squadronsLoading } =
        useFindSquadrons();

      expect(squadrons).toEqual(data.findSquadrons);
      expect(squadronsError).toEqual(null);
      expect(squadronsLoading).toEqual(false);
    });

    it('should return null', () => {
      useQuery.mockReturnValue({ loading: false, error: null, data: null });
      const { squadrons, squadronsError, squadronsLoading } =
        useFindSquadrons();

      expect(squadrons).toEqual(null);
      expect(squadronsError).toEqual(null);
      expect(squadronsLoading).toEqual(false);
    });
  });

  describe('useCountActiveUsersByMissionPartnerId', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: false,
      data: {}
    });
    it('should return data', () => {
      const countActiveUsersByMissionPartnerId =
        useCountActiveUsersByMissionPartnerId('123');
      expect(useQuery).toHaveBeenCalled();
      expect(countActiveUsersByMissionPartnerId).toEqual(
        expect.objectContaining({
          countActiveUsersLoading: false,
          countActiveUsersError: null,
          countActiveUsers: 0
        })
      );
    });
  });

  describe('useCountOnboardedUsersByMissionPartnerId', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: false,
      data: {}
    });

    it('should return data', () => {
      const countOnboardedUsersByMissionPartnerId =
        useCountOnboardedUsersByMissionPartnerId('123');
      expect(useQuery).toHaveBeenCalled();
      expect(countOnboardedUsersByMissionPartnerId).toEqual(
        expect.objectContaining({
          countOnboardedUsers: 0,
          countOnboardedUsersLoading: false,
          countOnboardedUsersError: null
        })
      );
    });
  });

  describe('useCountUsersByMissionPartnerId', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: false,
      data: {}
    });

    it('should return data', () => {
      const countUsersByMissionPartnerId = useCountUsersByMissionPartnerId();

      expect(useQuery).toHaveBeenCalled();
      expect(countUsersByMissionPartnerId).toEqual(
        expect.objectContaining({
          countAllUsers: 0,
          countAllUsersLoading: false,
          countAllUsersError: null
        })
      );
    });
  });

  describe('useFindOrganizations', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: false,
      data: {}
    });
    it('should return data', () => {
      const findOrgs = useFindOrganizations('title');
      expect(useQuery).toHaveBeenCalled();
      expect(findOrgs).toEqual(
        expect.objectContaining({
          organizations: null,
          organizationsLoading: false,
          organizationsError: null
        })
      );
    });
  });

  describe('useRevokeVendorLicensesForUsers', () => {
    it('should return data', () => {
      useMutation.mockReturnValue([
        jest.fn(),
        {
          loading: false,
          error: null,
          data: {
            revokeVendorLicensesForUsers: {
              id: 'test'
            }
          }
        }
      ]);

      const {
        revokeVendorLicensesForUsers,
        revokeVendorLicensesForUsersLoading,
        revokeVendorLicensesForUsersError,
        revokeVendorLicensesForUsersData
      } = useRevokeVendorLicensesForUsers();

      expect(revokeVendorLicensesForUsers).toBeDefined();
      expect(revokeVendorLicensesForUsersLoading).toEqual(false);
      expect(revokeVendorLicensesForUsersError).toEqual(null);
      expect(revokeVendorLicensesForUsersData).toEqual({
        id: 'test'
      });
    });

    it('should return null', () => {
      useMutation.mockReturnValue([
        jest.fn(),
        {
          loading: false,
          error: null,
          data: null
        }
      ]);

      const {
        revokeVendorLicensesForUsers,
        revokeVendorLicensesForUsersLoading,
        revokeVendorLicensesForUsersError,
        revokeVendorLicensesForUsersData
      } = useRevokeVendorLicensesForUsers();

      expect(revokeVendorLicensesForUsers).toBeDefined();
      expect(revokeVendorLicensesForUsersLoading).toEqual(false);
      expect(revokeVendorLicensesForUsersError).toEqual(null);
      expect(revokeVendorLicensesForUsersData).toEqual(null);
    });
  });

  describe('useRemoveUsersFromMissionPartner', () => {
    it('should return data', () => {
      useMutation.mockReturnValue([
        jest.fn(),
        {
          loading: false,
          error: null,
          data: {
            removeUsersFromMissionPartner: {
              id: 'test'
            }
          }
        }
      ]);

      const {
        removeUsersFromMissionPartner,
        removeUsersFromMissionPartnerLoading,
        removeUsersFromMissionPartnerError,
        removeUsersFromMissionPartnerData
      } = useRemoveUsersFromMissionPartner();

      expect(removeUsersFromMissionPartner).toBeDefined();
      expect(removeUsersFromMissionPartnerLoading).toEqual(false);
      expect(removeUsersFromMissionPartnerError).toEqual(null);
      expect(removeUsersFromMissionPartnerData).toEqual({
        id: 'test'
      });
    });

    it('should return null', () => {
      useMutation.mockReturnValue([
        jest.fn(),
        {
          loading: false,
          error: null,
          data: null
        }
      ]);

      const {
        removeUsersFromMissionPartner,
        removeUsersFromMissionPartnerLoading,
        removeUsersFromMissionPartnerError,
        removeUsersFromMissionPartnerData
      } = useRemoveUsersFromMissionPartner();

      expect(removeUsersFromMissionPartner).toBeDefined();
      expect(removeUsersFromMissionPartnerLoading).toEqual(false);
      expect(removeUsersFromMissionPartnerError).toEqual(null);
      expect(removeUsersFromMissionPartnerData).toEqual(null);
    });
  });
});
