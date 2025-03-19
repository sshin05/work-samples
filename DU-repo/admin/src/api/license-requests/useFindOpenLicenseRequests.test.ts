import { useQuery } from '@apollo/client';
import { useFindOpenLicenseRequests } from './useFindOpenLicenseRequests';

jest.mock('@apollo/client');

describe('useFindOpenLicenseRequests', () => {
  it('should return an object containing mutation variables', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined
    });

    const result = useFindOpenLicenseRequests('mp1');

    expect(result.requestsLoading).toEqual(false);
    expect(result.requestsError).toEqual(undefined);
    expect(result.requests).toEqual({});
  });
});
