import { sqlFindCohorts } from '@/app/api/cohorts';
import type { CohortData } from '../../../../CreateCohortPage.types';

export const fetchCohortsForMissionPartner = async (
  missionPartnerId: string
): Promise<CohortData[]> => {
  try {
    const requestOptions = {
      filter: { missionPartnerId },
      limit: 500,
      page: 0
    };

    const requestDetails = sqlFindCohorts();
    const urlOptions = btoa(JSON.stringify(requestOptions));

    const requestUrl = `${requestDetails.route}?name=${requestDetails.name}&options=${urlOptions}`;

    const response = await fetch(requestUrl);
    const { data } = await response.json();

    return data?.records || [];
  } catch {
    return [];
  }
};
