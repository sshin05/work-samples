import { useQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react';
import { useGetLicensesByVendorId } from './useGetLicensesByVendorId';

jest.mock('@apollo/client');

const licenseByVendorIdData = {
  records: [
    {
      userId: 'id',
      userEmail: 'homer@gmail.com',
      missionPartnerName: 'Udemy',
      assignedAt: '2022-07-27T18:50:12.638Z',
      user: {
        branch: 'test-force',
        metadata: {
          command: 'usaf'
        }
      }
    }
  ],
  total: 1
};

describe('getLicensesByVendorId', () => {
  it('should correctly map response', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        getLicensesByVendorId: licenseByVendorIdData
      },
      refetch: jest.fn()
    });

    const { result } = renderHook(() => useGetLicensesByVendorId({}));

    const { licensesLoading, licensesError, licenses } = result.current;

    expect(licenses.total).toEqual(1);
    expect(licenses.records[0].userEmail).toEqual('homer@gmail.com');
    expect(licensesError).toEqual(null);
    expect(licensesLoading).toEqual(false);
  });
});
