'use client';

import { useAddRecentMissionPartners } from '@/api/user/useAddRecentMissionPartners';
import { useEffect } from 'react';

export const UpdateRecentMP = ({ missionPartnerId }) => {
  const { addRecentMissionPartners } = useAddRecentMissionPartners();

  useEffect(() => {
    if (missionPartnerId) {
      addRecentMissionPartners(missionPartnerId);
    }
    //addRecentMissionPartners is not a useCallback or memoized and shouldn't be used as a dependency array item.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionPartnerId]);

  return null;
};
