import { useExportMissionPartnerLicensesForVendor } from '@/api/license';
import { renderHook, act } from '@@/test-utils';
import { useNotificationCenter } from '@cerberus/react';
import { useHandleDownloadLicenses } from './useHandleDownloadLicenses';

jest.mock('@/api/license', () => ({
  useExportMissionPartnerLicensesForVendor: jest.fn()
}));

jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn()
}));

describe('useHandleDownloadLicenses', () => {
  let exportMissionPartnerLicensesForVendorMock;
  let exportMissionPartnerLicensesForVendorLoadingMock;
  let notifyMock;

  beforeEach(() => {
    exportMissionPartnerLicensesForVendorMock = jest.fn();
    exportMissionPartnerLicensesForVendorLoadingMock = false;
    notifyMock = jest.fn();

    (useExportMissionPartnerLicensesForVendor as jest.Mock).mockReturnValue({
      exportMissionPartnerLicensesForVendor:
        exportMissionPartnerLicensesForVendorMock,
      exportMissionPartnerLicensesForVendorLoading:
        exportMissionPartnerLicensesForVendorLoadingMock
    });

    (useNotificationCenter as jest.Mock).mockReturnValue({
      notify: notifyMock
    });
  });

  it('should call exportMissionPartnerLicensesForVendor and notify success on successful export', async () => {
    exportMissionPartnerLicensesForVendorMock.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() =>
      useHandleDownloadLicenses({
        missionPartnerId: 'mp-123',
        missionPartnerName: 'Mission Partner',
        vendorId: 'vendor-456',
        vendorName: 'Vendor Name'
      })
    );

    await act(async () => {
      await result.current.handleDownloadLicenses();
    });

    expect(exportMissionPartnerLicensesForVendorMock).toHaveBeenCalledWith(
      'mp-123',
      'Mission Partner',
      'vendor-456',
      'Vendor Name'
    );
    expect(notifyMock).toHaveBeenCalledWith({
      palette: 'success',
      heading: 'Success',
      description:
        'The export has been started. You will receive an email when it is ready.'
    });
  });

  it('should call exportMissionPartnerLicensesForVendor and notify error on failed export', async () => {
    exportMissionPartnerLicensesForVendorMock.mockRejectedValueOnce(
      new Error('Some error')
    );

    const { result } = renderHook(() =>
      useHandleDownloadLicenses({
        missionPartnerId: 'mp-123',
        missionPartnerName: 'Mission Partner',
        vendorId: 'vendor-456',
        vendorName: 'Vendor Name'
      })
    );

    await act(async () => {
      await result.current.handleDownloadLicenses().catch(() => {});
    });

    expect(exportMissionPartnerLicensesForVendorMock).toHaveBeenCalledWith(
      'mp-123',
      'Mission Partner',
      'vendor-456',
      'Vendor Name'
    );
    expect(notifyMock).toHaveBeenCalledWith({
      palette: 'danger',
      heading: 'Error',
      description: 'There was an error exporting licenses.'
    });
  });

  it('should return the downloadingLicenses state correctly', () => {
    (useExportMissionPartnerLicensesForVendor as jest.Mock).mockReturnValueOnce(
      {
        exportMissionPartnerLicensesForVendor: jest.fn(),
        exportMissionPartnerLicensesForVendorLoading: true
      }
    );

    const { result } = renderHook(() =>
      useHandleDownloadLicenses({
        missionPartnerId: 'mp-123',
        missionPartnerName: 'Mission Partner',
        vendorId: 'vendor-456',
        vendorName: 'Vendor Name'
      })
    );

    expect(result.current.downloadingLicenses).toBe(true);
  });
});
