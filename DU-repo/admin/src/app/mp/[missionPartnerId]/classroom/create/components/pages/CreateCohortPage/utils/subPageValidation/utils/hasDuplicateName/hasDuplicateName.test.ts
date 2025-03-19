import { fetchCohortsForMissionPartner } from '../../requests/fetchCohortsForMissionPartner/fetchCohortsForMissionPartner';
import { getHasDuplicateName } from './hasDuplicateName';

jest.mock(
  '../../requests/fetchCohortsForMissionPartner/fetchCohortsForMissionPartner'
);

const mockFetchCohortsForMissionPartner =
  fetchCohortsForMissionPartner as jest.Mock;

describe('getHasDuplicateName', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns true if a duplicate name exists', async () => {
    const missionPartnerId = 'ABCDEF10-1234-1234-1234-000000000001';
    const cohortId = 'mock-cohort-id';
    const duplicateCohortName = 'Dupe Cohort';

    mockFetchCohortsForMissionPartner.mockResolvedValue([
      { name: 'First Cohort' },
      { name: 'Second Cohort' },
      { name: 'Third Cohort' },
      { name: duplicateCohortName },
      { name: 'Fifth Cohort ' }
    ]);

    const result = await getHasDuplicateName(
      duplicateCohortName,
      missionPartnerId,
      cohortId
    );

    expect(result).toBe(true);
  });

  it('returns false if the match is for the same cohort', async () => {
    const missionPartnerId = 'ABCDEF10-1234-1234-1234-000000000001';
    const cohortId = 'mock-cohort-id';
    const duplicateCohortName = 'Dupe Cohort';

    mockFetchCohortsForMissionPartner.mockResolvedValue([
      { name: 'First Cohort' },
      { name: 'Second Cohort' },
      { name: 'Third Cohort' },
      { name: duplicateCohortName, id: cohortId },
      { name: 'Fifth Cohort ' }
    ]);

    const result = await getHasDuplicateName(
      duplicateCohortName,
      missionPartnerId,
      cohortId
    );

    expect(result).toBe(false);
  });

  it('returns false if no duplicate name exists', async () => {
    const missionPartnerId = 'ABCDEF10-1234-1234-1234-000000000001';
    const cohortId = 'mock-cohort-id';

    const cohortName = 'New Cohort';

    mockFetchCohortsForMissionPartner.mockResolvedValue([
      { name: 'First Cohort' },
      { name: 'Second Cohort' },
      { name: 'Third Cohort' },
      { name: 'Fourth Cohort ' }
    ]);

    const result = await getHasDuplicateName(
      cohortName,
      missionPartnerId,
      cohortId
    );

    expect(result).toBe(false);
  });

  it('returns false if the cohorts list is empty', async () => {
    const missionPartnerId = 'ABCDEF10-1234-1234-1234-000000000001';
    const cohortId = 'mock-cohort-id';
    const cohortName = 'New Cohort';

    mockFetchCohortsForMissionPartner.mockResolvedValue([]);

    const result = await getHasDuplicateName(
      cohortName,
      missionPartnerId,
      cohortId
    );

    expect(result).toBe(false);
  });

  it('returns true if the check fails', async () => {
    const missionPartnerId = 'ABCDEF10-1234-1234-1234-000000000001';
    const cohortId = 'mock-cohort-id';

    const cohortName = 'New Cohort';

    mockFetchCohortsForMissionPartner.mockRejectedValue(
      new Error('Simulated Fetch Cohorts for Mission Partner Network Error')
    );

    const result = await getHasDuplicateName(
      cohortName,
      missionPartnerId,
      cohortId
    );

    expect(result).toBe(true);
  });
});
