import { renderHook, act } from '@@/test-utils';
import { useNotificationCenter } from '@cerberus/react';
import { useHandleRemoveLicenses } from './useHandleRemoveLicenses';
import { useRemoveLicenses } from '@/api/license';

jest.mock('@/api/license', () => ({
  useRemoveLicenses: jest.fn()
}));

jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn()
}));

describe('useHandleRemoveLicenses', () => {
  const removeLicensesMock = jest.fn();
  const removeLicensesLoadingMock = false;
  const notifyMock = jest.fn();
  const refetchLicensesMock = jest.fn();
  const selectedUsersRefMock = { current: ['user1', 'user2'] };
  const setSelectedRowsMock = jest.fn();
  const setSelectedUsersLengthMock = jest.fn();
  const setShowCheckboxesMock = jest.fn();

  beforeEach(() => {
    (useRemoveLicenses as jest.Mock).mockReturnValue({
      removeLicenses: removeLicensesMock,
      removeLicensesLoading: removeLicensesLoadingMock
    });

    (useNotificationCenter as jest.Mock).mockReturnValue({
      notify: notifyMock
    });
  });

  it('should successfully remove licenses and notify success', async () => {
    removeLicensesMock.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() =>
      useHandleRemoveLicenses({
        vendorId: 'vendor-123',
        missionPartnerId: 'mission-partner-456',
        selectedUsersRef: selectedUsersRefMock,
        setSelectedRows: setSelectedRowsMock,
        setSelectedUsersLength: setSelectedUsersLengthMock,
        setShowCheckboxes: setShowCheckboxesMock,
        refetchLicenses: refetchLicensesMock
      })
    );

    await act(async () => {
      await result.current.handleRemoveLicenses();
    });

    expect(removeLicensesMock).toHaveBeenCalledWith(
      'vendor-123',
      'mission-partner-456',
      ['user1', 'user2']
    );
    expect(selectedUsersRefMock.current).toEqual([]);
    expect(setSelectedUsersLengthMock).toHaveBeenCalledWith(0);
    expect(setShowCheckboxesMock).toHaveBeenCalledWith(false);
    expect(notifyMock).toHaveBeenCalledWith({
      palette: 'success',
      heading: 'Success',
      description: 'The licenses have been successfully revoked.'
    });
    expect(refetchLicensesMock).toHaveBeenCalled();
  });

  it('should notify error on failure', async () => {
    removeLicensesMock.mockRejectedValueOnce(new Error('Some error'));

    const { result } = renderHook(() =>
      useHandleRemoveLicenses({
        vendorId: 'vendor-123',
        missionPartnerId: 'mission-partner-456',
        selectedUsersRef: selectedUsersRefMock,
        setSelectedRows: setSelectedRowsMock,
        setSelectedUsersLength: setSelectedUsersLengthMock,
        setShowCheckboxes: setShowCheckboxesMock,
        refetchLicenses: refetchLicensesMock
      })
    );

    await act(async () => {
      await result.current.handleRemoveLicenses().catch(() => {});
    });

    expect(removeLicensesMock).toHaveBeenCalledWith(
      'vendor-123',
      'mission-partner-456',
      ['user1', 'user2']
    );
    expect(notifyMock).toHaveBeenCalledWith({
      palette: 'danger',
      heading: 'Error',
      description: 'There was an error removing licenses.'
    });
    expect(refetchLicensesMock).toHaveBeenCalled();
  });

  it('should return the removeLicensesLoading state correctly', () => {
    (useRemoveLicenses as jest.Mock).mockReturnValue({
      removeLicenses: jest.fn(),
      removeLicensesLoading: true
    });

    const { result } = renderHook(() =>
      useHandleRemoveLicenses({
        vendorId: 'vendor-123',
        missionPartnerId: 'mission-partner-456',
        selectedUsersRef: { current: [] },
        setSelectedRows: jest.fn(),
        setSelectedUsersLength: jest.fn(),
        setShowCheckboxes: jest.fn(),
        refetchLicenses: jest.fn()
      })
    );

    expect(result.current.removeLicensesLoading).toBe(true);
  });
});
