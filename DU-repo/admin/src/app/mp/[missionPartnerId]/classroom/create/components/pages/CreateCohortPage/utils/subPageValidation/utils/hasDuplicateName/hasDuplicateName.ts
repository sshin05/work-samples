import { fetchCohortsForMissionPartner } from '../../requests/fetchCohortsForMissionPartner/fetchCohortsForMissionPartner';

export const getHasDuplicateName = async (
  name: string,
  missionPartnerId: string,
  cohortId: string | undefined
): Promise<boolean> => {
  try {
    const cohortsForMissionPartner =
      await fetchCohortsForMissionPartner(missionPartnerId);

    const duplicate = cohortsForMissionPartner.find(
      existingCohort =>
        existingCohort?.name === name && existingCohort.id !== cohortId
    );

    return Boolean(duplicate);
  } catch {
    return true;
  }
};
