import type { GetDidLoadMissionPartnerDataArgs } from './getDidLoadMissionPartnerData.types';

export const getDidLoadMissionPartnerData = ({
  isLoading,
  hasData
}: GetDidLoadMissionPartnerDataArgs) => {
  return !isLoading && !hasData;
};
