// fetchCohortsForMissionPartner.test.ts
import { fetchCohortsForMissionPartner } from './fetchCohortsForMissionPartner';
import { sqlFindCohorts } from '@/app/api/cohorts';

jest.mock('@/app/api/cohorts', () => ({
  sqlFindCohorts: jest.fn()
}));

const mockSqlFindCohorts = sqlFindCohorts as jest.Mock;

describe('fetchCohortsForMissionPartner', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
    mockSqlFindCohorts.mockReturnValue({
      route: '/admin/api/cohorts',
      name: 'find-cohorts'
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.fetch = originalFetch;
  });

  it('should fetch cohorts successfully with the correct request URL', async () => {
    const missionPartnerId = 'ABCDEF10-1234-1234-1234-000000000001';
    const mockResponse = {
      data: {
        records: [
          { id: 1, name: 'Cohort 1' },
          { id: 2, name: 'Cohort 2' }
        ]
      }
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse)
    });

    const result = await fetchCohortsForMissionPartner(missionPartnerId);

    const expectedOptions = btoa(
      JSON.stringify({ filter: { missionPartnerId }, limit: 500, page: 0 })
    );
    const expectedUrl = `/admin/api/cohorts?name=find-cohorts&options=${expectedOptions}`;

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockResponse.data.records);
  });

  it('returns an empty array if the results are empty', async () => {
    const missionPartnerId = 'ABCDEF10-1234-1234-1234-000000000001';

    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: { records: undefined } })
    });

    const result = await fetchCohortsForMissionPartner(missionPartnerId);

    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('returns an empty array if the fetch fails', async () => {
    const missionPartnerId = 'ABCDEF10-1234-1234-1234-000000000001';

    (global.fetch as jest.Mock).mockRejectedValue(
      new Error('Fetch Network Error')
    );

    const result = await fetchCohortsForMissionPartner(missionPartnerId);

    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
