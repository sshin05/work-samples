'use client';

import { BadgesSectionLoader } from '@/components_new/loaders/BadgesSectionLoader/BadgesSectionLoader';
import dynamic from 'next/dynamic';

const BadgesSection = dynamic(() => import('../BadgesSection/BadgesSection'), {
  ssr: false,
  loading: () => <BadgesSectionLoader />
});

export const MpBadgesPage = ({ missionPartnerId }) => {
  return <BadgesSection missionPartnerId={missionPartnerId} />;
};
