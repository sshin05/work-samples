import { useRevokeVendorLicensesForUsers } from '@/api/users';
import { renderHook, act } from '@@/test-utils';
import { useNotificationCenter } from '@cerberus/react';
import { useHandleBulkRemoveLicenses } from './useHandleBulkRemoveLicenses';

jest.mock('@/api/users', () => ({
  useRevokeVendorLicensesForUsers: jest.fn()
}));

jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn()
}));

describe('useHandleBulkRemoveLicenses', () => {
  let revokeVendorLicensesForUsersMock;
  let revokeVendorLicensesForUsersLoadingMock;
  let notifyMock;
  let refetchLicensesMock;

  beforeEach(() => {
    revokeVendorLicensesForUsersMock = jest.fn();
    revokeVendorLicensesForUsersLoadingMock = false;
    notifyMock = jest.fn();
    refetchLicensesMock = jest.fn();

    (useRevokeVendorLicensesForUsers as jest.Mock).mockReturnValue({
      revokeVendorLicensesForUsers: revokeVendorLicensesForUsersMock,
      revokeVendorLicensesForUsersLoading:
        revokeVendorLicensesForUsersLoadingMock
    });

    (useNotificationCenter as jest.Mock).mockReturnValue({
      notify: notifyMock
    });
  });

  it('should call revokeVendorLicensesForUsers and notify success on success', async () => {
    revokeVendorLicensesForUsersMock.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() =>
      useHandleBulkRemoveLicenses({
        missionPartnerId: 'mission-partner-id',
        vendorId: 'vendor-id',
        refetchLicenses: refetchLicensesMock
      })
    );

    await act(async () => {
      await result.current.handleBulkRemoveLicenses('file.csv');
    });

    expect(revokeVendorLicensesForUsersMock).toHaveBeenCalledWith(
      'file.csv',
      'mission-partner-id',
      'vendor-id'
    );
    expect(notifyMock).toHaveBeenCalledWith({
      palette: 'success',
      heading: 'Success',
      description:
        'You will receive an email when the file has finished processing.'
    });
    expect(refetchLicensesMock).toHaveBeenCalled();
  });

  it('should call revokeVendorLicensesForUsers and notify error on failure', async () => {
    revokeVendorLicensesForUsersMock.mockRejectedValueOnce(
      new Error('Some error')
    );

    const { result } = renderHook(() =>
      useHandleBulkRemoveLicenses({
        missionPartnerId: 'mission-partner-id',
        vendorId: 'vendor-id',
        refetchLicenses: refetchLicensesMock
      })
    );

    await act(async () => {
      await result.current.handleBulkRemoveLicenses('file.csv').catch(() => {});
    });

    expect(revokeVendorLicensesForUsersMock).toHaveBeenCalledWith(
      'file.csv',
      'mission-partner-id',
      'vendor-id'
    );
    expect(notifyMock).toHaveBeenCalledWith({
      palette: 'danger',
      heading: 'Error',
      description: 'There was an error removing licenses.'
    });
    expect(refetchLicensesMock).toHaveBeenCalled();
  });

  it('should return the loading state correctly', () => {
    (useRevokeVendorLicensesForUsers as jest.Mock).mockReturnValue({
      revokeVendorLicensesForUsers: jest.fn(),
      revokeVendorLicensesForUsersLoading: true
    });

    const { result } = renderHook(() =>
      useHandleBulkRemoveLicenses({
        missionPartnerId: 'mission-partner-id',
        vendorId: 'vendor-id',
        refetchLicenses: jest.fn()
      })
    );

    expect(result.current.revokeVendorLicensesForUsersLoading).toBe(true);
  });
});
