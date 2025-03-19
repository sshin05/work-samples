import { useQuery, useMutation } from '@apollo/client';
import { act, renderHook } from '@testing-library/react';
import { useFindLicenseRequestById } from './useFindLicenseRequestById';
import { useGetVendorsForOpenLicenseRequests } from './useGetVendorsForOpenLicenseRequests';
import { useGetBranchesForOpenLicenseRequest } from './useGetBranchesForOpenLicenseRequest';
import { useApproveLicenseRequest } from './useApproveLicenseRequest';
import { useDeclineLicenseRequest } from './useDeclineLicenseRequest';
import { useExportMissionPartnerLicenseRequests } from './useExportMissionPartnerLicenseRequests';
import licenseRequestMocks from '@/api/_mocks/licenses/requests.json';

jest.mock('@apollo/client');

describe('license request test', () => {
  describe('useFindLicenseRequestById', () => {
    it('should return data', () => {
      const currentLicenseRequest = licenseRequestMocks[0];
      const data = {
        findLicenseRequestById: currentLicenseRequest
      };

      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data,
        refetch: jest.fn()
      });

      const {
        licenseRequestsById,
        licenseRequestsByIdError,
        licenseRequestsByIdLoading,
        refetchLicenseRequestsById
      } = useFindLicenseRequestById(currentLicenseRequest.userId);

      expect(licenseRequestsById).toEqual(data.findLicenseRequestById);
      expect(licenseRequestsByIdError).toEqual(null);
      expect(licenseRequestsByIdLoading).toEqual(false);
      expect(refetchLicenseRequestsById).toBeInstanceOf(Function);
    });

    it('should return null', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: null,
        data: [],
        refetch: jest.fn()
      });
      const {
        licenseRequestsById,
        licenseRequestsByIdError,
        licenseRequestsByIdLoading,
        refetchLicenseRequestsById
      } = useFindLicenseRequestById('id');

      expect(licenseRequestsById).toEqual([]);
      expect(licenseRequestsByIdError).toEqual(null);
      expect(licenseRequestsByIdLoading).toEqual(false);
      expect(refetchLicenseRequestsById).toBeInstanceOf(Function);
    });
  });

  describe('useGetVendorsForOpenLicenseRequests', () => {
    it('should return an array of vendor(s)', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: undefined,
        data: {
          getVendorsForOpenLicenseRequests: ['Vendor A']
        }
      });

      const { result } = renderHook(() =>
        useGetVendorsForOpenLicenseRequests('mp1')
      );

      const { vendorsForOpenLicenseRequests } = result.current;

      expect(vendorsForOpenLicenseRequests[0]).toBe('Vendor A');
    });
  });

  describe('useGetBranchesForOpenLicenseRequest', () => {
    it('should return an array of branch(es)', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: undefined,
        data: {
          getBranchesForOpenLicenseRequests: ['Air Force']
        }
      });

      const { result } = renderHook(() =>
        useGetBranchesForOpenLicenseRequest('mp1')
      );

      const { branchesForOpenLicenseRequests } = result.current;

      expect(branchesForOpenLicenseRequests[0]).toBe('Air Force');
    });
  });

  describe('useApproveLicenseRequest', () => {
    it('should return an object containing mutation variables', () => {
      (useMutation as jest.Mock).mockReturnValue([
        jest.fn(),
        { loading: false, error: undefined, data: undefined }
      ]);

      const result = useApproveLicenseRequest();

      expect(result.approveLicenseRequest).toBeInstanceOf(Function);
      expect(result.approveLicenseRequestLoading).toEqual(false);
      expect(result.approveLicenseRequestError).toEqual(undefined);
      expect(result.approveLicenseRequestData).toEqual(undefined);
    });
  });

  describe('useDeclineLicenseRequest', () => {
    it('should return an object containing mutation variables', () => {
      (useMutation as jest.Mock).mockReturnValue([
        jest.fn(),
        { loading: false, error: undefined, data: undefined }
      ]);

      const result = useDeclineLicenseRequest();

      expect(result.declineLicenseRequest).toBeInstanceOf(Function);
      expect(result.declineLicenseRequestLoading).toEqual(false);
      expect(result.declineLicenseRequestError).toEqual(undefined);
      expect(result.declineLicenseRequestData).toEqual(undefined);
    });
  });

  describe('useExportMissionPartnerLicenseRequests', () => {
    it('should return an object containing mutation variables', async () => {
      const mockExportMissionPartnerLicenseRequests = jest.fn();

      (useMutation as jest.Mock).mockReturnValue([
        mockExportMissionPartnerLicenseRequests,
        { loading: false, error: null, data: null }
      ]);

      const { result } = renderHook(() =>
        useExportMissionPartnerLicenseRequests()
      );

      const { exportMissionPartnerLicenseRequests } = result.current;

      act(() =>
        exportMissionPartnerLicenseRequests(
          'missionPartnerId',
          'missionPartnerName',
          'vendorName',
          'branch'
        )
      );
      expect(mockExportMissionPartnerLicenseRequests).toHaveBeenCalledWith({
        variables: {
          branch: 'branch',
          missionPartnerId: 'missionPartnerId',
          missionPartnerName: 'missionPartnerName',
          vendorName: 'vendorName'
        }
      });
    });
  });
});
