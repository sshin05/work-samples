import { useAssignLicenseByMissionPartnerAndVendorAndUser } from './useAssignLicenseByMissionPartnerAndVendorAndUser';
import { useRemoveLicenses } from './useRemoveLicenses';
import { useCountAssignedLicensesForMissionPartner } from './useCountAssignedLicensesForMissionPartner';
import { useExportMissionPartnerLicensesForVendor } from './useExportMissionPartnerLicensesForVendor';
import { useExportLicenses } from './useExportLicenses';

const mockUseQuery = jest.fn();
const mockUseMutation = jest.fn();

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: (query, options) => mockUseQuery(query, options),
  useMutation: mutation => mockUseMutation(mutation)
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));

describe('license test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('useAssignLicenseByMissionPartnerAndVendorAndUser', async () => {
    const userInput = {
      email: 'a@b.c',
      firstName: 'grogu',
      lastName: 'mando'
    };

    const data = {
      assignLicenseByMissionPartnerAndVendorAndUser: {
        id: 'foo',
        status: 'PENDING',
        error: null
      }
    };
    mockUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data }
    ]);

    const assignLicenseByMissionPartnerAndVendorAndUser =
      useAssignLicenseByMissionPartnerAndVendorAndUser();
    assignLicenseByMissionPartnerAndVendorAndUser.assignLicenseByMissionPartnerAndVendorAndUser(
      'foo',
      'bar',
      userInput
    );

    expect(assignLicenseByMissionPartnerAndVendorAndUser).toEqual(
      expect.objectContaining({
        assignLicenseByMissionPartnerAndVendorAndUserLoading: false,
        assignLicenseByMissionPartnerAndVendorAndUserError: null,
        assignLicenseByMissionPartnerAndVendorAndUserData: {
          assignLicenseByMissionPartnerAndVendorAndUser: {
            id: 'foo',
            status: 'PENDING',
            error: null
          }
        }
      })
    );
    expect(
      assignLicenseByMissionPartnerAndVendorAndUser.assignLicenseByMissionPartnerAndVendorAndUser
    ).toBeInstanceOf(Function);
  });

  it('useRemoveLicenses', async () => {
    const testMock = jest.fn();
    mockUseMutation.mockReturnValue([
      data => testMock(data),
      { loading: false, error: null }
    ]);

    const removeLicensesApi = useRemoveLicenses();
    removeLicensesApi.removeLicenses('vendorId', 'missionPartnerId', [
      'user-id-1'
    ]);

    expect(removeLicensesApi).toEqual(
      expect.objectContaining({
        removeLicensesLoading: false,
        removeLicensesError: null
      })
    );
    expect(removeLicensesApi.removeLicenses).toBeInstanceOf(Function);

    expect(testMock).toHaveBeenCalledWith({
      variables: {
        input: {
          missionPartnerId: 'missionPartnerId',
          userIds: ['user-id-1'],
          vendorId: 'vendorId'
        }
      }
    });
  });

  describe('useCountAssignedLicensesForMissionPartner', () => {
    it('should return an object containing data', () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        error: undefined,
        data: undefined,
        refetch: jest.fn()
      });

      const result = useCountAssignedLicensesForMissionPartner('100');

      expect(result.assignedLicensesCountLoading).toEqual(false);
      expect(result.assignedLicensesCountError).toEqual(undefined);
      expect(result.assignedLicensesCount).toEqual([]);
      expect(result.refetchAssignedLicensesCount).toBeDefined();
    });
  });

  describe('useExportMissionPartnerLicensesForVendor', () => {
    it('should return not loading', () => {
      mockUseMutation.mockReturnValue([
        jest.fn(),
        { loading: false, error: null }
      ]);

      const result = useExportMissionPartnerLicensesForVendor();

      expect(result.exportMissionPartnerLicensesForVendorLoading).toEqual(
        false
      );
      expect(result.exportMissionPartnerLicensesForVendorError).toEqual(null);
      expect(result.exportMissionPartnerLicensesForVendor).toBeInstanceOf(
        Function
      );
    });
  });

  describe('useExportLicenses', () => {
    it('should return not loading', () => {
      mockUseMutation.mockReturnValue([
        jest.fn(),
        { loading: false, error: null }
      ]);

      const result = useExportLicenses();

      expect(result.exportLicensesLoading).toEqual(false);
      expect(result.exportLicensesError).toEqual(null);
      expect(result.exportLicenses).toBeDefined();
    });
  });
});
