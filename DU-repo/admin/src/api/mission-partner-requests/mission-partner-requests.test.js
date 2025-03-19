import { useQuery, useMutation } from '@apollo/client';
import { useFindMissionPartnerRequestById } from './useFindMissionPartnerRequestById';
import { useFindOpenForMissionPartner } from './useFindOpenForMissionPartner';
import { useApproveMissionPartnerRequest } from './useApproveMissionPartnerRequest';
import { useDeclineMissionPartnerRequest } from './useDeclineMissionPartnerRequest';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('Mission Partners test', () => {
  describe('useFindMissionPartnerRequestById', () => {
    const missionPartnerRequestData = {
      findMissionPartnerRequestById: {
        userFirstName: 'Test',
        userLastName: 'User',
        userEmail: 'test@test.com',
        missionPartnerName: 'Test Mission Partner',
        requestedAt: new Date('01-01-2021')
      }
    };

    it('should return data', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: missionPartnerRequestData,
        refetch: jest.fn()
      });

      const {
        findMissionPartnerRequestByIdLoading,
        findMissionPartnerRequestByIdError,
        findMissionPartnerRequestByIdData
      } = useFindMissionPartnerRequestById();

      expect(findMissionPartnerRequestByIdData).toEqual(
        missionPartnerRequestData.findMissionPartnerRequestById
      );
      expect(findMissionPartnerRequestByIdError).toEqual(null);
      expect(findMissionPartnerRequestByIdLoading).toEqual(false);
    });
  });

  describe('useFindOpenForMissionPartner', () => {
    const missionPartnerRequestData = {
      findOpenForMissionPartner: [
        {
          userFirstName: 'Test',
          userLastName: 'User',
          userEmail: 'test@test.com',
          missionPartnerName: 'Test Mission Partner',
          requestedAt: new Date('01-01-2021')
        }
      ]
    };

    it('should return data', () => {
      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data: missionPartnerRequestData,
        refetch: jest.fn()
      });

      const {
        findOpenForMissionPartnerLoading,
        findOpenForMissionPartnerError,
        findOpenForMissionPartnerData
      } = useFindOpenForMissionPartner();

      expect(findOpenForMissionPartnerData).toEqual(
        missionPartnerRequestData.findOpenForMissionPartner
      );
      expect(findOpenForMissionPartnerError).toEqual(null);
      expect(findOpenForMissionPartnerLoading).toEqual(false);
    });
  });

  describe('useApproveMissionPartnerRequest', () => {
    const missionPartnerRequestData = {
      approveMissionPartnerRequest: {
        userFirstName: 'Test',
        userLastName: 'User',
        userEmail: 'test@test.com',
        missionPartnerName: 'Test Mission Partner',
        requestedAt: new Date('01-01-2021')
      }
    };
    it('should return data', () => {
      const testMock = jest.fn();
      useMutation.mockReturnValue([
        data => testMock(data),
        { loading: false, error: null, data: missionPartnerRequestData }
      ]);

      const {
        approveMissionPartnerRequest,
        approveMissionPartnerRequestData,
        approveMissionPartnerRequestLoading,
        approveMissionPartnerRequestError
      } = useApproveMissionPartnerRequest('1', '12345');

      approveMissionPartnerRequest();

      expect(approveMissionPartnerRequest).toBeInstanceOf(Function);
      expect(testMock).toHaveBeenCalledWith({
        variables: {
          missionPartnerId: '1',
          userId: '12345'
        }
      });
      expect(approveMissionPartnerRequestData).toEqual(
        missionPartnerRequestData.approveMissionPartnerRequest
      );
      expect(approveMissionPartnerRequestLoading).toEqual(false);
      expect(approveMissionPartnerRequestError).toEqual(null);
    });
  });

  describe('useDeclineMissionPartnerRequest', () => {
    const missionPartnerRequestData = {
      declineMissionPartnerRequest: {
        userFirstName: 'Test',
        userLastName: 'User',
        userEmail: 'test@test.com',
        missionPartnerName: 'Test Mission Partner',
        requestedAt: new Date('01-01-2021')
      }
    };

    it('should return data', () => {
      const testMock = jest.fn();
      useMutation.mockReturnValue([
        data => testMock(data),
        { loading: false, error: null, data: missionPartnerRequestData }
      ]);

      const {
        declineMissionPartnerRequest,
        declineMissionPartnerRequestData,
        declineMissionPartnerRequestLoading,
        declineMissionPartnerRequestError
      } = useDeclineMissionPartnerRequest('1', '12345');

      declineMissionPartnerRequest();

      expect(declineMissionPartnerRequest).toBeInstanceOf(Function);
      expect(testMock).toHaveBeenCalledWith({
        variables: {
          missionPartnerId: '1',
          userId: '12345'
        }
      });
      expect(declineMissionPartnerRequestData).toEqual(
        missionPartnerRequestData.declineMissionPartnerRequest
      );
      expect(declineMissionPartnerRequestLoading).toEqual(false);
      expect(declineMissionPartnerRequestError).toEqual(null);
    });
  });
});
