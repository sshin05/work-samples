import { useQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react';
import { useFindOpenLicenseRequestsFilter } from './useFindOpenLicenseRequestsFilter';

jest.mock('@apollo/client');

describe('useFindOpenLicenseRequestsFilter', () => {
  it('should return an object', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        findOpenLicenseRequests: {
          records: [
            {
              missionPartnerId: 'mp1'
            }
          ]
        }
      }
    });

    const { result } = renderHook(() =>
      useFindOpenLicenseRequestsFilter({
        missionPartnerId: 'mp1',
        vendorName: 'Udemy',
        branch: 'Air Force',
        pageSize: 10,
        pageNumber: 0
      })
    );

    const { requests } = result.current;

    expect(requests[0].missionPartnerId).toBe('mp1');
  });
});
